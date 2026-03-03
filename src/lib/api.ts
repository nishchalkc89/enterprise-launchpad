export const API_BASE = "https://api.foxnutfusion.com/api";
export const API_ORIGIN = "https://api.foxnutfusion.com";

export const resolveUploadUrl = (url: string | undefined): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${API_ORIGIN}${url}`;
  return url;
};

const isFormDataBody = (body: BodyInit | null | undefined) =>
  typeof FormData !== "undefined" && body instanceof FormData;

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token =
    localStorage.getItem("token") || (window as any).__ADMIN_TOKEN__;

  const method = (options.method || "GET").toUpperCase();
  const baseHeaders: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Avoid sending JSON content-type for GET/HEAD (prevents unnecessary CORS preflight)
  if (method !== "GET" && method !== "HEAD" && !isFormDataBody(options.body)) {
    baseHeaders["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...baseHeaders,
      ...(options.headers || {}),
    },
  });

  const isLoginRequest = endpoint === "/admin/login";

  // Auto logout only for protected requests, never for login itself
  if (!isLoginRequest && (res.status === 401 || res.status === 403)) {
    console.warn("Session expired — logging out");
    localStorage.removeItem("token");
    delete (window as any).__ADMIN_TOKEN__;
    window.location.href = "/admin";
    return { error: "Unauthorized" };
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text().catch(() => "");
    return text ? { error: text } : null;
  }

  return await res.json().catch(() => null);
};