import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-sm">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>

        <ProfileInfo onLogOut={onLogOut} />
      </div>
    </div>
  );
};

export default Navbar;
45;
