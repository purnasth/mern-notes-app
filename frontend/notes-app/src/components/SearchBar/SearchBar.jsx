import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <>
      <div className="w-80 flex items-center px-4 py-2 bg-slate-100 rounded-md">
        <input
          type="text"
          placeholder="Search notes"
          className="w-full bg-transparent focus:outline-none px-1 py-1"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {value.length > 0 && (
          <IoMdClose
            className="text-slate-500 cursor-pointer hover:text-black text-2xl mr-2"
            onClick={onClearSearch}
          />
        )}

        <FaSearch
          className="text-slate-500 cursor-pointer hover:text-black"
          onClick={handleSearch}
        />
      </div>
    </>
  );
};

export default SearchBar;
