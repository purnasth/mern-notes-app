import React from "react";
import {  MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import AddEditNotes from "../../pages/Home/AddEditNotes";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <>
      <div className="border rounded p-4 bg-white hover:shadow-md transition-all duration-200 ease-in-out">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-sm text-slate-500">{date}</span>
          </div>

          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-rose-500" : "text-slate-500"
            }`}
            onClick={onPinNote}
          />
        </div>

        <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-500">{tags}</span>

          <div className="flex items-center gap-2">
            <MdCreate
              className="text-slate-500 cursor-pointer hover:text-green-600"
              onClick={onEdit}
            />
            <MdDelete
              className="text-slate-500 cursor-pointer hover:text-red-600"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
