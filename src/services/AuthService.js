import { jwtDecode } from "jwt-decode";

export async function login(email, password) {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const { message } = await response.json();

    throw new Error(message);
  }

  return await response.json();
}

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
