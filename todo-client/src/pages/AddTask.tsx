import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";

const AddTask = () => {
  const [title, setTitle] = useState("");
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    <div className="mt-5">
      <h1 className="text-3xl font-bold mb-4">Create Task</h1>
      <hr className="w-25 h-1 rounded-full -mt-3 bg-black mb-10" />
      <div className="px-20">
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block">
              Enter your title
            </label>
            <input
              type="text"
              placeholder="Your Task Title"
              className="border border-gray-300 outline-0 w-[80%] rounded-xl bg-black/5 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block">
              Enter your description
            </label>
            <div className="w-[80%] h-50 mb-4 py-2 rounded-xl">
              <div
                className="border border-gray-300  bg-black/5"
                ref={editorRef}
              ></div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
