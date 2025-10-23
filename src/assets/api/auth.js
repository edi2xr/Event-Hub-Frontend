
const URL = "http://localhost:5000/auth";

export async function loginUser(credentials) {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function fetchUserProfile() {
  const response = await fetch(`${URL}/profile`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Could not load profile");
  return data.user;
}

export async function refreshToken() {
  const response = await fetch(`${URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Session expired");
  return data.access_token;
}
