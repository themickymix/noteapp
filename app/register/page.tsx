"use client";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying success/error messages
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [isLoading, setIsLoading] = useState(false); // Prevent multiple clicks

  // Disable the button if username, email, or password is invalid
  const isDisabled =
    !username.trim() || !email.trim() || password.length < 6 || isLoading;

  const registerUser = async () => {
    // Trim inputs to remove extra spaces
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Check if fields are empty
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      setMessage("All fields are required.");
      return;
    }

    // Check if email contains '@'
    if (!trimmedEmail.includes("@")) {
      setMessage("Invalid email! Must contain '@'.");
      return;
    }

    // Check if password is at least 6 characters
    if (trimmedPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setMessage(""); // Reset message before request

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
            username: trimmedUsername,
            email: trimmedEmail,
            password: trimmedPassword,
          }),
        }
      );

      const data = await response.json().catch(() => null); // Prevents crash if response is not JSON

      if (response.ok) {
        setMessage("User registered successfully!");
        console.log("User registered successfully.");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data?.message || "Registration failed. Please try again.");
        console.error("Registration failed:", data?.message);
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
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
          disabled={isDisabled} // Disable button if conditions are not met
          className={`w-full p-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
          }`}>
          {isLoading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("failed") || message.includes("error")
                ? "text-red-500"
                : "text-green-500"
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
