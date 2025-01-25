import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded-full outline-none"
      />

      <FaRegEye
        className="text-pink-500 cursor-pointer"
        onClick={toggleShowPassword}
      />
    </div>
  );
};

export default PasswordInput;
