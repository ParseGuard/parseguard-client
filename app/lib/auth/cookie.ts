import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Set authentication token in cookie
 * 
 * @param token - JWT token
 */
export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_KEY, token, { 
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/' 
  });
};

/**
 * Get authentication token from cookie
 * 
 * @returns JWT token or undefined
 */
export const getAuthToken = (): string | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return Cookies.get(AUTH_TOKEN_KEY);
};

/**
 * Remove authentication token from cookie
 */
export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY, { path: '/' });
};

/**
 * Parse cookie string to get auth token (for server-side usage)
 * 
 * @param cookieString - Raw cookie string from request headers
 * @returns JWT token or null
 */
export const parseAuthTokenFromCookie = (cookieString: string | null): string | null => {
  if (!cookieString) return null;
  
  const match = cookieString.match(new RegExp('(^| )' + AUTH_TOKEN_KEY + '=([^;]+)'));
  if (match) {
    return match[2];
  }
  
  return null;
};
