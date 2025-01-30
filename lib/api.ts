export async function login(email: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function fetchProtectedData() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
