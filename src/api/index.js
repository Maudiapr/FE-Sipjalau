export async function apiFetch(endpoint, options = {}) {

    const response = await fetch(`/api${endpoint}`, {
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        ...options.headers,
        },
        ...options,
    });
    console.log("Request:", endpoint);
    
    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Body:", data);
    if (!response.ok) {
        const error = new Error(data.message || "Terjadi kesalahan");
        error.status = response.status;
        throw error;
    }

    return data;
}