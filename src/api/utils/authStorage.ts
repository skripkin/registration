import type { User } from '../types/auth';

interface StoredAuth {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const AUTH_STORAGE_KEY = 'auth';

export function loadAuthFromStorage(): StoredAuth & { isAuthenticated: boolean } {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user || null,
        accessToken: parsed.accessToken || null,
        refreshToken: parsed.refreshToken || null,
        isAuthenticated: Boolean(parsed.accessToken),
      };
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  };
}

export function saveAuthToStorage(auth: StoredAuth) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } catch {
    // ignore storage errors
  }
}

export function clearAuthStorage() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
