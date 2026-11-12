const configuredApiBase = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");
const API_BASE =
  configuredApiBase || (import.meta.env.DEV ? "http://localhost:5000" : "");

export function getApiBase() {
  return API_BASE;
}

export async function apiFetch(path, { token, ...options } = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getApiBase()}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }

  return data;
}
