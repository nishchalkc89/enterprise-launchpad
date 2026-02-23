export const API_BASE = "http://localhost:5000/api";

export const apiFetch = async (
    endpoint: string,
    options: RequestInit = {}
) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        },
    });

    return res.json();
};