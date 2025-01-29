import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({ noteDate, type, onClose, getAllNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState("");

  //   Add Note
  const addNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  //   Edit Note
  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }

    if (!content) {
      setError("Please enter content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNote();
    }
  };

  return (
    <>
      <div className="relative">
        <button
          className="size-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 text-dark  hover:bg-slate-50 "
          onClick={onClose}
        >
          <MdClose className="text-xl text-slate-400" />
        </button>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="input-label">
            Title
          </label>
          <input
            type="text"
            className="text-xl text-slate-950 outline-none"
            placeholder="GO to the Gym at 6 PM"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="" className="input-label">
            Content
          </label>
          <textarea
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="" className="input-label">
            Tags
          </label>

          <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className="text-rose-500 mt-2">{error}</p>}

        <button
          type="button"
          className="bg-rose-500 text-white rounded py-2 px-5 mt-4"
          onClick={handleAddNote}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddEditNotes;
