import React from "react";
import "./ProfileMenu.css";

const ProfileMenu = ({ user, onLogout }) => {
  return (
    <div className="profile-menu">
      <div className="profile-details">
        <p><strong>{user.username}</strong></p>
        <p>{user.email}</p>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
};
export default ProfileMenu;
