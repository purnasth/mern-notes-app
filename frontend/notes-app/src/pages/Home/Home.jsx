import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  };

  // Get all notes
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

  // Delete note
  const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.data && !response.data.error) {
        showToastMessage(response.data.message, "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showToastMessage(error.response.data.message, "delete");
      } else {
        showToastMessage("An error occurred. Please try again.", "delete");
      }
    }
  };

  useEffect(() => {
    getAllNotes();
    return () => {};
  }, []);

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message: message, type: type });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "", type: "" });
  };

  const navigate = useNavigate();

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Search notes by title or content
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-10">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdOn}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note._id)}
                onPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            message={
              isSearch
                ? `Oops no notes found! Create a new note.`
                : `Start creating your first note! Click on the '+' button below to add a new note that could be your thoughts, ideas, or anything you want to remember`
            }
          />
        )}
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
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
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
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        message={showToastMsg.message}
        isShown={showToastMsg.isShown}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
