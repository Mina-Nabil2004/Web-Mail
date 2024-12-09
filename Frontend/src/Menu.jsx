import React, { useState } from "react";
import { FaInbox, FaStar, FaPaperPlane, FaFileAlt, FaTrashAlt, FaCog } from "react-icons/fa";
import { MdLabel, MdMoreVert } from "react-icons/md";
import ComposeModal from "./ComposeModal";

import "./Menu.css";

const Menu = ({ activeMenu, setActiveMenu, onSend, onDraft }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
          onClick={() => setActiveMenu("Inbox")}
        >
          <FaInbox className="menu-icon" />
          <span>Inbox</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Starred" ? "active" : ""}`}
          onClick={() => setActiveMenu("Starred")}
        >
          <FaStar className="menu-icon" />
          <span>Starred</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Sent" ? "active" : ""}`}
          onClick={() => setActiveMenu("Sent")}
        >
          <FaPaperPlane className="menu-icon" />
          <span>Sent</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Drafts" ? "active" : ""}`}
          onClick={() => setActiveMenu("Drafts")}
        >
          <FaFileAlt className="menu-icon" />
          <span>Drafts</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Bin" ? "active" : ""}`}
          onClick={() => setActiveMenu("Bin")}
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
      <ComposeModal isOpen={isModalOpen} onClose={closeModal} onSend={onSend} onDraft={onDraft} />
    </div>
  );
};

export default Menu;
