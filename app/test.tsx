"use client";

import React, { useEffect, useState } from "react";
import Add from "./add";
import { useRouter } from "next/navigation";
import Delete from "./delete";
import NavBar from "./component/nav-bar";
import axios from "axios";

type Note = {
  _id: string;
  title: string;
  content: string;
};

function Test() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;

      const validNotes = data.filter(
        (note: Note) => note.title?.trim() || note.content?.trim()
      );

      setNotes(validNotes);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch notes. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData(); // Fetch notes initially
  }, [notes]);

  return (
    <div>
      <NavBar />
      <Add />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {notes.map((note: Note) => (
          <div key={note._id}>
            <div className="relative">
              <div
                className="card border-[1px] border-slate-300 rounded-md cursor-pointer overflow-hidden"
                onClick={() => router.push(`/note/${note._id}`)}>
                <div className="text-lg font-bold px-2 break-words line-clamp-2 mr-3">
                  {note.title}
                </div>
                <div className="text-sm p-2 break-words line-clamp-5">
                  {note.content}
                </div>
              </div>

              <div className="absolute top-1 right-1">
                <Delete id={note._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;
