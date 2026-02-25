// ============================================================
// SENTRIA — Auth Context
// Wraps AWS Cognito auth. Provides login, logout, and the
// current authenticated user + their dashboard config.
// ============================================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GlobalSignOutCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoConfig, API_BASE_URL } from './cognitoConfig';
import type { UserSession, SentriaUser, ClientConfig } from '../types/dashboard';
import { DEFAULT_DASHBOARD_CONFIG } from '../types/dashboard';

// ── Token storage (sessionStorage is safer than localStorage for JWTs) ──────
const TOKEN_KEY = 'sentria_tokens';

interface StoredTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresAt: number; // Unix ms
}

function saveTokens(tokens: StoredTokens) {
  sessionStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

function loadTokens(): StoredTokens | null {
  try {
    const raw = sessionStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const tokens: StoredTokens = JSON.parse(raw);
    if (Date.now() > tokens.expiresAt) {
      sessionStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return tokens;
  } catch {
    return null;
  }
}

function clearTokens() {
  sessionStorage.removeItem(TOKEN_KEY);
}

// ── Auth Context shape ────────────────────────────────────────────────────────
interface AuthContextType {
  session: UserSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
  getIdToken: () => string | null;       // ← added
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ── Cognito client ────────────────────────────────────────────────────────────
const cognitoClient = new CognitoIdentityProviderClient({
  region: cognitoConfig.region,
});

// ── Parse JWT claims from ID token ───────────────────────────────────────────
function parseJwtClaims(token: string): Record<string, any> {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return {};
  }
}

// ── Build minimal session from JWT when API is unavailable ──────────────────
function buildFallbackSession(idToken: string): UserSession {
  const claims = parseJwtClaims(idToken);
  const groups: string[] = claims['cognito:groups'] || [];
  const role = groups.includes('super-admin') ? 'super-admin'
    : groups.includes('client-admin') ? 'client-admin'
    : 'client-user';

  return {
    user: {
      userId: claims.sub || '',
      email: claims.email || '',
      firstName: claims.given_name || claims.email?.split('@')[0] || 'User',
      lastName: claims.family_name || '',
      clientId: claims['custom:clientId'] || 'unknown',
      role,
      jobTitle: '',
    },
    config: DEFAULT_DASHBOARD_CONFIG,
  };
}

// ── Fetch user config from our API (with JWT fallback) ───────────────────────
async function fetchUserConfig(idToken: string): Promise<UserSession> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/config`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      return res.json() as Promise<UserSession>;
    }
    console.warn(`API returned ${res.status}, using JWT fallback`);
  } catch (err) {
    console.warn('API unreachable, using JWT fallback:', err);
  }

  return buildFallbackSession(idToken);
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: restore session from storage
  useEffect(() => {
    const restore = async () => {
      const tokens = loadTokens();
      if (!tokens) {
        setIsLoading(false);
        return;
      }
      try {
        const userSession = await fetchUserConfig(tokens.idToken);
        setSession(userSession);
      } catch (err) {
        console.error('Session restore failed:', err);
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: cognitoConfig.userPoolClientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const response = await cognitoClient.send(command);
      const result = response.AuthenticationResult;

      if (!result?.AccessToken || !result?.IdToken || !result?.RefreshToken) {
        throw new Error('Incomplete auth response from Cognito');
      }

      const tokens: StoredTokens = {
        accessToken: result.AccessToken,
        idToken: result.IdToken,
        refreshToken: result.RefreshToken,
        expiresAt: Date.now() + (result.ExpiresIn || 3600) * 1000,
      };

      saveTokens(tokens);

      const userSession = await fetchUserConfig(result.IdToken);
      setSession(userSession);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    const tokens = loadTokens();
    if (tokens) {
      try {
        await cognitoClient.send(
          new GlobalSignOutCommand({ AccessToken: tokens.accessToken })
        );
      } catch (err) {
        console.warn('Global sign-out failed, clearing local session:', err);
      }
    }
    clearTokens();
    setSession(null);
  }, []);

  const getAccessToken = useCallback((): string | null => {
    return loadTokens()?.accessToken ?? null;
  }, []);

  // ← New: returns the ID token (what API Gateway Cognito authorizer validates)
  const getIdToken = useCallback((): string | null => {
    return loadTokens()?.idToken ?? null;
  }, []);

  const refreshSession = useCallback(async () => {
    const tokens = loadTokens();
    if (!tokens?.refreshToken) return;

    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: cognitoConfig.userPoolClientId,
        AuthParameters: {
          REFRESH_TOKEN: tokens.refreshToken,
        },
      });

      const response = await cognitoClient.send(command);
      const result = response.AuthenticationResult;
      if (!result?.AccessToken) return;

      const newTokens: StoredTokens = {
        ...tokens,
        accessToken: result.AccessToken,
        idToken: result.IdToken || tokens.idToken,
        expiresAt: Date.now() + (result.ExpiresIn || 3600) * 1000,
      };

      saveTokens(newTokens);
      const userSession = await fetchUserConfig(result.IdToken || tokens.idToken);
      setSession(userSession);
    } catch (err) {
      console.error('Token refresh failed, logging out:', err);
      clearTokens();
      setSession(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isAuthenticated: !!session,
        login,
        logout,
        getAccessToken,
        getIdToken,         // ← added to provider value
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}