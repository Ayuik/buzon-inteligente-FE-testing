export async function login(email, password) {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {

    try {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login fallido");
    } catch {

      throw new Error("Login fallido");
    }
  }

  return await response.json();
}