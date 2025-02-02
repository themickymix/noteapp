import React from "react";
import { useRouter } from "next/router";
import Add from "./add";
import NavBar from "./component/nav-bar";
import Delete from "./delete";

type Note = {
  _id: string;
  title: string;
  content: string;
};

type Props = {
  notes: Note[];
  error?: string;
};

const Test = ({ notes, error }: Props) => {
  const router = useRouter();

  return (
    <div>
      <NavBar />
      <Add />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
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
};

export default Test;
