import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <span
              key={index}
              className="text-rose-600 bg-rose-100 px-2 py-1 rounded-md text-xs flex items-center w-fit "
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className=" text-base ml-2 cursor-pointer"
              >
                <MdClose />
              </button>
            </span>
          ))}
      </div>
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          placeholder="Add tags"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />

        <button
          onClick={addNewTag}
          className="size-8  flex items-center justify-center rounded border border-rose-500 hover:bg-rose-500"
        >
          <MdAdd className="text-2xl text-rose-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
