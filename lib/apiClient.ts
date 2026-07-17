"use client";

export const API_BASE = "http://localhost:8000/api";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_auth_token");
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("admin_auth_token", token);
  } else {
    localStorage.removeItem("admin_auth_token");
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${API_BASE}${path}`;
  const token = getAuthToken();

  const headers = new Headers(options.headers || {});
  
  // Conditionally add Content-Type if we aren't uploading multipart form data
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = "Terjadi kesalahan pada server.";
    try {
      const data = await response.json();
      errorMsg = data.message || errorMsg;
    } catch (e) {
      // Ignored
    }
    throw new Error(errorMsg);
  }

  // Handle 204 No Content or empty bodies
  if (response.status === 204) {
    return null;
  }

  return response.json();
}
