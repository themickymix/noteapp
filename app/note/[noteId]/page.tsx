import { use } from "react";
import Note from "../note";

type NoteProps = {
  params: Promise<{ noteId: string }>;
};

function Page({ params }: NoteProps) {
  const { noteId } = use(params);

  return (
    <div>
      <Note noteId={noteId} />
    </div>
  );
}

export default Page;
