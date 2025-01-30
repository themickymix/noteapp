import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

const Delete = ({ id }: { id: string }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (deleteId) {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/${deleteId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => console.log(response.data))
        .catch((error) => console.error("Error deleting note:", error));
    }
    setDeleteId(null);
  }, [deleteId]);

  const handleDelete = () => {
    setDeleteId(id);
    console.log("delete id", deleteId);
  };

  return (
    <div className="hover:bg-gray-200 rounded-full p-1">
      <div onClick={handleDelete}>
        <Trash2 className="w-4 h-4 cursor-pointer " />
      </div>
    </div>
  );
};

export default Delete;
