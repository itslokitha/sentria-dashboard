// ============================================================
// SENTRIA — AWS Cognito Configuration
// Replace these values with your actual Cognito pool details.
// In production, these come from environment variables.
// ============================================================

export const cognitoConfig = {
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
  userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
};

// API Gateway base URL for all backend calls
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Environment
export const IS_PROD = import.meta.env.PROD;