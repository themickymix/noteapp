import React from "react";
import axios from "axios";

function Logout() {
  // Function to handle log
  const handleLogout = async () => {
    try {
      // Send POST request to logout
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`,
        {},
        { withCredentials: true }
      );

      // Clear the token from localStorage
      localStorage.removeItem("token");

      // Optionally, redirect to the login page after logout
      window.location.replace("/login"); // Change to your preferred page

      console.log(response.data.message); // Logs "Logout successful."
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
