import React from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import moment from "moment";

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
            <span className="text-sm text-slate-500">
              {moment(date).format("MMM DD, YYYY")}
            </span>
          </div>

          {/* <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-rose-500" : "text-slate-500"
            }`}
            onClick={onPinNote}
          /> */}
          {/* here instead could you please make it such that if isPinned is true add the fill icon else outline */}
          {isPinned ? (
            <RiPushpin2Fill
              className="text-rose-500 cursor-pointer hover:text-rose-600 icon-btn"
              onClick={onPinNote}
            />
          ) : (
            <RiPushpin2Line
              className="text-slate-500 cursor-pointer hover:text-rose-600 icon-btn"
              onClick={onPinNote}
            />
          )}
        </div>

        <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

        <div className="flex items-center justify-between mt-2">
          <ul className="text-xs text-slate-500 flex items-center flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <li key={index}>#{tag}</li>
            ))}
          </ul>

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
