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
  GetUserCommand,
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
    // Expired?
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
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ── Cognito client ────────────────────────────────────────────────────────────
const cognitoClient = new CognitoIdentityProviderClient({
  region: cognitoConfig.region,
});

// ── Fetch user config from our API ───────────────────────────────────────────
async function fetchUserConfig(idToken: string): Promise<UserSession> {
  const res = await fetch(`${API_BASE_URL}/api/user/config`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user config: ${res.status}`);
  }

  return res.json() as Promise<UserSession>;
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
        // Cognito default expiry is 1 hour
        expiresAt: Date.now() + (result.ExpiresIn || 3600) * 1000,
      };

      saveTokens(tokens);

      // Fetch this user's dashboard config from our API
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
        // Sign out locally even if global sign-out fails
        console.warn('Global sign-out failed, clearing local session:', err);
      }
    }
    clearTokens();
    setSession(null);
  }, []);

  const getAccessToken = useCallback((): string | null => {
    return loadTokens()?.accessToken ?? null;
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
