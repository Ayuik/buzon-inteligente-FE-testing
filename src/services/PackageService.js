import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:8080/api/accesscode/profile";

export async function getPackages (profileId, token) {
    const response = await fetch(`${API_URL}/${profileId}`, {
        method: "GET",
        headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${token}`},
    });

    if (!response.ok) throw new Error("No hay paquetes");
    return await response.json();
};