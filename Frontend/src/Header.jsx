import React, { useState } from "react";
import "./Header.css";
import logoMail from "/src/assets/logoMAIL.jpg";
import ProfileMenu from "./ProfileMenu";

const Header = ({ onLogout }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prevState) => !prevState);
  };

  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  const user = {
    name: "Omar Khaled",
    email: "omar27@meow.com",
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logoMail} alt="Logo" className="logo" />
        <h2>Mail Website</h2>
      </div>

      <div className="header-center">
        <input type="text" className="search-bar" placeholder="Search mail" />
        <button className="search-button">
          <i className="material-icons">search</i>
        </button>
      </div>

      <div className="header-right">
        <button className="icon-button">
          <i className="material-icons">apps</i>
        </button>
        <button className="icon-button">
          <i className="material-icons">notifications</i>
        </button>

        <div className="user-profile" onClick={toggleProfileMenu}>
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="user-avatar"
          />
        </div>

        {profileMenuOpen && (
          <ProfileMenu user={user} onLogout={() => {
            onLogout();
            closeProfileMenu();
          }} />
        )}
      </div>
    </header>
  );
};

export default Header;
