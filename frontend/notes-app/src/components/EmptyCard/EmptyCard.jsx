import React from "react";

const EmptyCard = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-5">
      <img
        src="https://img.freepik.com/free-vector/add-notes-concept-illustration_114360-2496.jpg"
        alt="Empty"
        className="w-80 h-80 object-contain"
      />
      <p className="text-sm text-slate-500 mt-2 max-w-xl text-center mx-auto">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
