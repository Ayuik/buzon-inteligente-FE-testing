// src/services/AuthService.js
export async function login(email, password) {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Login fallido");
    }
  
    return await response.json();
  }
  