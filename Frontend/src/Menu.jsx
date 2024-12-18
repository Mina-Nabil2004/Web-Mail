import React, { useState } from "react";
import { FaInbox, FaStar, FaPaperPlane, FaFileAlt, FaTrashAlt, FaCog, FaAddressBook } from "react-icons/fa";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MailIcon from '@mui/icons-material/Mail';
import { MdLabel, MdMoreVert } from "react-icons/md";
import ComposeModal from "./ComposeModal";
import ContactsWindow from "./ContactsWindow";
import AddFolderModal from "./AddFolderModal";

import "./Menu.css";
import axios from "axios";

const Menu = ({ userId, user, activeMenu, setActiveMenu, onSend, onDraft , handleAllMail, folders, setActiveFolder, setActiveFolderID, activeFolderID, maxPageSize,page, setPage,categories,setCategories}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isContactsOpen, setContactsOpen] = useState(false);
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false); 
  console.log(activeFolderID);
  console.log(categories);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openContacts = () => {
    setContactsOpen(true);
  };

  const closeContacts = () => {
    setContactsOpen(false);
  };

  const handleMenuClick = async (menu) => {
    setPage(0);
    for(let i=0 ;i<folders.length ;i++) {
      if(folders[i].name === menu) {
       try {
        const response = await axios.get(`http://localhost:8080/email/folder/${folders[i].folderID}/${maxPageSize}/${0}`)
        setActiveFolder(response.data);
        setActiveFolderID(folders[i].folderID);
       } catch (error) {
        console.error("Error fetching folder:", error);
       }
      }
    }
    setActiveMenu(menu);
  };

  const handleAllMailClick = async () =>{
    setPage(0);
    try {
      const response = await axios.get(`http://localhost:8080/email/allMail/${userId}/${maxPageSize}/${0}`)
      setActiveFolder(response.data);
      setActiveFolderID("All");
     } catch (error) {
      console.error("Error fetching folder:", error);
     }
     setActiveMenu("All Mails");
  };

  const openAddFolderModal = () => {
    setAddFolderModalOpen(true);
  };

  const closeAddFolderModal = () => {
    setAddFolderModalOpen(false);
  };

  const addNewFolder = async (folderName) => {
    try{
      console.log();
      const response = await axios.post(`http://localhost:8080/email/addFolder/${userId}/${folderName}/${activeFolderID}/${maxPageSize}/${page}`)
      setCategories(response.data);
     } catch (error) {
      console.error("Error adding folder:", error);
    }
    // setCategories((prevCategories) => [...prevCategories, folderName]);
    closeAddFolderModal();
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
          onClick={() => handleMenuClick("inbox")}
        >
          <FaInbox className="menu-icon" />
          <span>Inbox</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Starred" ? "active" : ""}`}
          onClick={() => handleMenuClick("starred")}
        >
          <FaStar className="menu-icon" />
          <span>Starred</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Sent" ? "active" : ""}`}
          onClick={() => handleMenuClick("sent")}
        >
          <FaPaperPlane className="menu-icon" />
          <span>Sent</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Draft" ? "active" : ""}`}
          onClick={() => handleMenuClick("draft")}
        >
          <FaFileAlt className="menu-icon" />
          <span>Drafts</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "Trash" ? "active" : ""}`}
          onClick={() => handleMenuClick("trash")}
        >
          <FaTrashAlt className="menu-icon" />
          <span>Trash</span>
        </div>
        <div
          className={`menu-item ${activeMenu === "All Mail" ? "active" : ""}`}
          onClick={handleAllMailClick}
        >
          <MailIcon className="menu-icon" />
          <span>All Mail</span>
        </div>

        {/* Categories Section */}
        <div className="menu-item">
          <MdLabel className="menu-icon" />
          <span style={{ width: '50px' }}>Categories</span>
          <div className="submenu">
            {categories.map((category, index) => (
              <div key={index} className="submenu-item">
                {category.name}
              </div>
            ))}
          </div>
        </div>

        {/* Add Folder Button */}
        <div className="menu-item" onClick={openAddFolderModal}>
          <CreateNewFolderIcon className="menu-icon" />
          <span>Add folder</span>
        </div>

        {/* Contacts Button */}
        <div className="menu-item" onClick={openContacts}>
          <FaAddressBook className="menu-icon" />
          <span>Contacts</span>
        </div>
      </div>

      {/* Compose Modal */}
      <ComposeModal
        activeFolderID={activeFolderID}
        setActiveFolder={setActiveFolder}
        maxPageSize={maxPageSize}
        page={page}
        userId={userId}
        user={user}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSend={onSend}
        onDraft={onDraft}
      />
      
      {/* Contacts Window */}
      {isContactsOpen && <ContactsWindow onClose={closeContacts} />}
      
      {/* Add Folder Modal */}
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={closeAddFolderModal}
        onAddFolder={addNewFolder}
      />
    </div>
  );
};

export default Menu;


 {/* Categories Section */}
        {/* {<div className="menu-item">
          <MdLabel className="menu-icon"/>
          <span style={{width: "50px"}}>Categories</span>
          <div className="submenu">
            <div className="submenu-item">Less</div>
            <div className="submenu-item">Important</div>
            <div className="submenu-item">Chats</div>
            <div className="submenu-item">Scheduled</div>
            <div className="submenu-item">All Mail</div>
            <div className="submenu-item">Spam</div>
          </div>
        </div> } */}

          {/* Categories Section */}
            {/* <div className="menu-item">
              <MdLabel className="menu-icon" />
              <span style={{ width: '50px' }}>Categories</span>
              <div className="submenu">
                {categories.map((category, index) => (
                  <div key={index} className="submenu-item">
                    {category}
                  </div>
                ))}
              </div>
            </div> */}

        {/* Manage Labels Section */}
        {/* <div className="menu-item">
          <FaCog className="menu-icon" />
          <span>Manage labels</span>
        </div> */}

        {/* <div className="menu-item">
          <MdMoreVert className="menu-icon" />
          <span>Create new label</span>
        </div> */}