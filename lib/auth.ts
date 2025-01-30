export interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function removeToken(): void {
  localStorage.removeItem('token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function parseJwt(token: string): User | null {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return null;
  }
}