const URL = "http://192.168.0.112:5000/api/auth";


export async function getAllUsers() {
  const res = await fetch(`${URL}/users`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load users");
  return data.users;
}

export async function toggleUserStatus(userId) {
  const res = await fetch(`${URL}/users/${userId}/toggle-status`, {
    method: "PATCH",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update user status");
  return data.user;
}
