import React from 'react';
import { FaStickyNote, FaAddressBook, FaArchive, FaTrashAlt, FaCog } from 'react-icons/fa';
import './Sidebar2.css'; // Add your CSS for styling

function Sidebar2() {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <div className="menu-item">
          <FaStickyNote className="menu-icon" />
          <span>Notes</span>
        </div>
        <div className="menu-item">
          <FaAddressBook className="menu-icon" />
          <span>Contacts</span>
        </div>
        <div className="menu-item">
          <FaArchive className="menu-icon" />
          <span>Archive</span>
        </div>
        <div className="menu-item">
          <FaTrashAlt className="menu-icon" />
          <span>Trash</span>
        </div>
        <div className="menu-item">
          <FaCog className="menu-icon" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar2;
