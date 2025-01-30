"use client";

import React, { useEffect, useState } from "react";
import Delete from "../delete";
import Link from "next/link";
import axios from "axios";
import { ChevronLeft } from "lucide-react";

type Note = {
  id: string;
  title: string;
  content: string;
};

function Note({ noteId }: { noteId: string }) {
  const [note, setNote] = useState<Note | null>(null);
  const [localNote, setLocalNote] = useState<Note | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Fetch the token once and store it
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/note/${noteId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNote(response.data);
        setLocalNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };
    fetchData();
  }, [noteId, token]);

  useEffect(() => {
    if (!localNote || !token) return;

    const handleUpdate = async (updatedNote: Note) => {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/note/${noteId}`,
          updatedNote,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNote(response.data);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      handleUpdate(localNote);
    }, 1000); // Wait for 1 second before sending the update

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, [localNote, noteId, token]); // Trigger update on localNote change

  if (!note || !localNote || !token) return null;

  return (
    <div className="relative">
      <div className="p-1 md:p-10">
        <div className="h-[80vh] w-full">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setLocalNote({ ...localNote, title: e.target.value })
            }
            value={localNote.title}
            className="border-none outline-none w-full p-0 m-0 bg-none mb-2 font-bold text-2xl"
            spellCheck={false}
          />
          <textarea
            placeholder="Take a note"
            value={localNote.content}
            onChange={(e) =>
              setLocalNote({ ...localNote, content: e.target.value })
            }
            className="border-none outline-none p-0 m-0  w-[100%] h-[100%] resize-none overflow-auto"
            spellCheck={false}
          />
        </div>
      </div>
      <div className="absolute top-1 left-1">
        <Link href="/">
          <span className="flex items-center">
            <ChevronLeft /> Back
          </span>
        </Link>
      </div>
      <div className="absolute top-1 right-1">
        <Link href="/">
          <Delete id={noteId} />
        </Link>
      </div>
    </div>
  );
}

export default Note;
