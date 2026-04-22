const AUTH_KEY = "vd_auth";

export function saveToken(token: string) {
  localStorage.setItem(AUTH_KEY, token);
}

export function getToken() {
  return localStorage.getItem(AUTH_KEY);
}

export function clearToken() {
  localStorage.removeItem(AUTH_KEY);
}
