"use client";
/* import React, { useState, useEffect } from "react";
import axios from "axios"; */
import Test from "./test";

const App = () => {
/* 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Ensures cookies are sent
        });

        console.log("User is authenticated:", response.data);
        setIsAuthenticated(response.data.isAuthenticated); // Adjust this key if needed
      } catch (error: unknown) {
        setIsAuthenticated(false); // Set explicitly to false

        if (axios.isAxiosError(error) && error.response) {
          console.error("User is not authenticated:", error.response.data);
        } else {
          console.error("An error occurred:", error);
        }
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
 */
  return (
    <div>
    
      <Test />
    </div>
  );
};

export default App;
