"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/`,
        { title, content },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error adding note:", error));
    setTitle("");
    setContent("");
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full md:w-96 p-2 border-2 rounded-md">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-none outline-none"
        />
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-none outline-none resize-none overflow-auto"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Add;
