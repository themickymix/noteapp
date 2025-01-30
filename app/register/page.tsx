"use client";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success/error messages
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

  const registerUser = async () => {
    // Check if email contains '@'
    if (!email.includes("@")) {
      setMessage("Invalid email! Must contain '@'.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
        {
          method: "POST",
          credentials: "include",
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
        setMessage("User registered successfully!");
        console.log("User registered successfully.");
      } else {
        setMessage(`Registration failed: ${data.message}`);
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          onClick={registerUser}
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Register
        </button>
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("failed") ? "text-red-500" : "text-green-500"
            }`}>
            {message}
          </p>
        )}
        <div className="mt-4 text-center text-sm">
          <span>Already have an account? </span>
          <Link href="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
