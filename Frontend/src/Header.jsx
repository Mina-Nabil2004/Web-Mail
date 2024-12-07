import React from "react";
import "./Header.css";
import logoMail from "/src/assets/logoMAIL.jpg"; // Corrected import

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logoMail} alt="Logo" className="logo" />
        <h2>Mail Website</h2>
      </div>

      <div className="header-center">
        <input type="text" className="search-bar" placeholder="Search mail" />
        <button className="search-button">
          <i className="material-icons">search</i> {/* Google Material Icon */}
        </button>
      </div>

      <div className="header-right">
        <button className="icon-button">
          <i className="material-icons">apps</i> {/* Grid icon */}
        </button>
        <button className="icon-button">
          <i className="material-icons">notifications</i> {/* Notifications */}
        </button>
        <div className="user-profile">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
