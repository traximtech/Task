import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import Button, { BackButton } from "../components/Button";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      title.trim() === "" ||
      quillRef.current?.getText().trim() === ""
    ) {
      toast.error("Task title and description are required");
      return;
    }

    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/task/add`, {
      title,
      description: quillRef.current?.getText(),
    });
    toast.success("Task created successfully");
    navigate("/");
    setLoading(true);
    setTitle("");
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);
  return (
    <div className="m-10 w-4/5 mx-auto">
      <BackButton
        onClick={() => navigate("/")}
      >
        <i className="fa-solid fa-arrow-rotate-left mr-2"></i>
        Go Back
      </BackButton>
      <h1 className="text-2xl font-bold mb-1 uppercase">Create Task</h1>
      <hr className="w-25 h-1 rounded-full bg-black mb-10" />
      <div className="">
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              placeholder="Your Task Title"
              className="border-b-2 border-gray-500 text-[#4f4f4f] rounded-t-1xl outline-0 w-full h-12 bg-gray-50 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <div className="h-50 mb-4 py-2 rounded-xl">
              <div
                className="border w-full border-gray-300 text-lg text-[#4f4f4f] bg-gray-50"
                ref={editorRef}
              ></div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              disabled={
                loading || !title.trim()
              }
              className="disabled:cursor-not-allowed disabled:bg-gray-400 bg-black/80 hover:bg-black uppercase font-medium text-white w-1/6 py-3 rounded-xl flex items-center justify-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
