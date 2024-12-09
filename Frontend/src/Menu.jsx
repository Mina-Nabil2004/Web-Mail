import React, { useState } from 'react';
import { FaInbox, FaStar, FaPaperPlane, FaFileAlt, FaTrashAlt, FaCog } from 'react-icons/fa';
import { MdLabel, MdMoreVert } from 'react-icons/md';
import ComposeModal from './ComposeModal'; // Import the modal component

import './Menu.css'; // Ensure you have styles for the menu

const Menu = () => {
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  // Open the compose modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Close the compose modal
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
        <div className="menu-item">
          <FaInbox className="menu-icon" />
          <span>Inbox (4)</span>
        </div>
        <div className="menu-item">
          <FaStar className="menu-icon" />
          <span>Starred</span>
        </div>
        <div className="menu-item">
          <FaPaperPlane className="menu-icon" />
          <span>Sent</span>
        </div>
        <div className="menu-item">
          <FaFileAlt className="menu-icon" />
          <span>Drafts (5)</span>
        </div>
        <div className="menu-item">
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
      <ComposeModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Menu; 
