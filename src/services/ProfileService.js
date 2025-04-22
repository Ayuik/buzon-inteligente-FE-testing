const API_URL = "http://localhost:8080/api/profile/user";

export const getUserProfile = async (userId, token) => {
    const response = await fetch(`${API_URL}/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) throw new Error("No se pudo obtener el perfil del usuario");
    return await response.json();
};

export const updateUserProfile = async (userId, data, token) => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("No se pudo actualizar el perfil del usuario");
    return await response.json();
};
