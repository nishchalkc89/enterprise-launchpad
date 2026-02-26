export const API_BASE = "http://localhost:5000/api";

export const apiFetch = async (
    endpoint: string,
    options: RequestInit = {}
) => {
    // 🔥 Always read latest token
    const token =
        localStorage.getItem("token") || (window as any).__ADMIN_TOKEN__;

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    // 🔥 AUTO LOGOUT if backend says unauthorized
    if (res.status === 401 || res.status === 403) {
        console.warn("Session expired — logging out");
        localStorage.removeItem("token");
        delete (window as any).__ADMIN_TOKEN__;
        window.location.href = "/admin";
        return;
    }

    // 🔥 Safe JSON parsing
    try {
        return await res.json();
    } catch {
        return null;
    }
};