import React, { useState } from "react";
import { FaInbox, FaStar, FaPaperPlane, FaFileAlt, FaTrashAlt, FaCog } from "react-icons/fa";
import { MdLabel, MdMoreVert } from "react-icons/md";
import ComposeModal from "./ComposeModal";

import "./Menu.css";

const Menu = ({ user, activeMenu, setActiveMenu, onSend, onDraft, setActiveFolder }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleActive = (name) =>{
    setActiveMenu(name);
    setActiveFolder(folder);
  }

  return (
    <div className="menu">
      {/* Compose Button */}
      <button className="compose-btn" onClick={openModal}>
        <span className="compose-icon">✏️</span> Compose
      </button>

      {/* Menu Items */}
      <div className="menu-items">
        <div
          className={`menu-item ${activeMenu === "Inbox" ? "active" : ""}`}
          onClick={() => handleActive("Inbox")}
        >
          <FaInbox className="menu-icon" />
          <span>Inbox</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Starred" ? "active" : ""}`}
          onClick={() => handleActive("Starred")}
        >
          <FaStar className="menu-icon" />
          <span>Starred</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Sent" ? "active" : ""}`}
          onClick={() => handleActive("Sent")}
        >
          <FaPaperPlane className="menu-icon" />
          <span>Sent</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Drafts" ? "active" : ""}`}
          onClick={() => handleActive("Drafts")}
        >
          <FaFileAlt className="menu-icon" />
          <span>Drafts</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Bin" ? "active" : ""}`}
          onClick={() => handleActive("Trash")}
        >
          <FaTrashAlt className="menu-icon" />
          <span>Bin</span>
        </div>
                {/* Categories Section */}
                <div className="menu-item">
          <MdLabel className="menu-icon" />
          <span>Categories</span>
          <div className="submenu">
            <div className="submenu-item">Less</div>
            <div className="submenu-item">Important</div>
            <div className="submenu-item">Chats</div>
            <div className="submenu-item">Scheduled</div>
            <div className="submenu-item">All Mail</div>
            <div className="submenu-item">Spam</div>
          </div>
        </div>

        {/* Manage Labels Section */}
        <div className="menu-item">
          <FaCog className="menu-icon" />
          <span>Manage labels</span>
        </div>

        <div className="menu-item">
          <MdMoreVert className="menu-icon" />
          <span>Create new label</span>
        </div>
      </div>

      {/* Compose Modal */}
      <ComposeModal user = {user} isOpen={isModalOpen} onClose={closeModal} onSend={onSend} onDraft={onDraft} />
    </div>
  );
};

export default Menu;
