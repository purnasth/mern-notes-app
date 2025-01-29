import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);

  // get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      {/* <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <h4 className="text-2xl mb-7">Welcome to Notes App</h4>
          <p className="text-center">
            This is a simple note-taking app built with React and Tailwind CSS.
          </p>
        </div>
      </div> */}

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-10">
          {allNotes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.createdOn}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() =>
                setOpenAddEditModal({
                  isShown: true,
                  type: "edit",
                  data: note,
                })
              }
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="size-12 flex cursor-pointer items-center justify-center rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium mt-4 fixed right-5 bottom-5"
        onClick={() =>
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          })
        }
      >
        <MdAdd className="text-3xl" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-8 overflow-auto"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: {
              blur: "10px",
            },
          },
        }}
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
    </>
  );
};

export default Home;
