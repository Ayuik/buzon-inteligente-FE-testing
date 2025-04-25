import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:8080/api/profile/user";

export async function getUserProfile (userId, token) {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: "GET",
        headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${token}`},
    });

    if (!response.ok) throw new Error("No se pudo obtener el perfil del usuario");
    return await response.json();
};

export const updateUserProfile = async (userId, data, token) => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${token}`},
            body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("No se pudo actualizar el perfil del usuario");
    return await response.json();
};

export async function validateToken(token) {
    const payload = jwtDecode(token);
    const response = await fetch(
      `http://localhost:8080/api/profile/user/${payload.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
  
    const json = await response.json();
  
    if (!response.ok) {
      const { message } = json;
  
      throw new Error(message);
    }
  
    return json;
  }