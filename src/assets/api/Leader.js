const URL = "http://127.0.0.1:5000/api/auth";


export async function activateSubscription() {
  const res = await fetch(`${URL}/subscribe`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Subscription failed");
  return data;
}


export async function getClubMembers() {
  const res = await fetch(`${URL}/club-members`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to get members");
  return data;
}
