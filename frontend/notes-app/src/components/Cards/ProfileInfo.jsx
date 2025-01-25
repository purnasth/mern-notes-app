import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogOut }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="size-12 flex items-center justify-center  rounded-full text-dark bg-rose-100">
        {getInitials("Purna Shrestha")}
      </div>

      <div>
        <p>Purna Shrestha</p>
        <button
          type="button"
          className="text-sm text-slate-700 cursor-pointer"
          onClick={onLogOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
