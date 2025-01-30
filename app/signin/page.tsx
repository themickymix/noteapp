"use client";
import React, { useState } from "react";

function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      // Store the token in localStorage on the frontend
      localStorage.setItem("token", data.token);

      // Extract user ID from the JWT token
      const userId = extractUserIdFromToken(data.token);

      // Optionally store user ID in localStorage (for further use)
      localStorage.setItem("userId", userId);

      console.log(
        "User registered successfully, token and user ID saved to localStorage"
      );
    } else {
      console.error("Registration failed:", data.message);
    }
  };

  const extractUserIdFromToken = (token: string) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
      return decoded.id; // The ID is stored in the payload of the token
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Page;
