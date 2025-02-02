import Test from "./test";
import { GetServerSideProps } from "next";
import axios from "axios";

// Define props type
type Props = {
  notes: {
    _id: string;
    title: string;
    content: string;
  }[];
};

// Fetch data on the server
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/`
    );
    const data = response.data;

    // Filter out invalid notes
    const validNotes = data.filter(
      (note: Props["notes"][0]) => note.title?.trim() || note.content?.trim()
    );

    return { props: { notes: validNotes } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { notes: [] } };
  }
};

export default function Page({ notes }: Props) {
  return <Test notes={notes} />; // ✅ Pass 'notes' prop
}
