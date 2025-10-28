const URL = "http://172.30.39.117:5000/api/auth";


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
// to keep a user logged in aki refresh page
export async function fetchUserProfile() {
  const response = await fetch(`${URL}/profile`, {
    method: "GET",
    credentials: "include",
  });

  const text = await response.text(); // get raw response
  try {
    const data = JSON.parse(text);
    if (!response.ok) throw new Error(data.error || "Could not load profile");
    return data.user;
  } catch {
    throw new Error("Invalid server response. Are you logged in?");
  }
}

// to refresh expired tokens to prevent a user from loggin in when they expire
export async function refreshToken() {
  const response = await fetch(`${URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Session expired");
  return data.access_token;
}
