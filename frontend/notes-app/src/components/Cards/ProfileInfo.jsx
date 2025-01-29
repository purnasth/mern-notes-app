import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogOut }) => {
  return (
    <div className="flex items-center gap-3">
      <h2 className="size-12 flex items-center justify-center  rounded-full text-dark bg-rose-100">
        {getInitials(userInfo?.fullName)}
      </h2>
      <div>
        <p>{userInfo?.fullName}</p>
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
