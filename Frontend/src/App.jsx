import React, { useState, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Sidebar2 from "./Sidebar2";
import Form from "./Form";
import CreateAccount from "./CreateAccount";
import ComposeModal from "./ComposeModal";
import DraftModel from "./DraftModel";

import "./App.css";
import axios from "axios";
import EmailModal from './EmailModal';
import { FaStar , FaTrashAlt} from "react-icons/fa";

// Initializing folders as an empty object, we'll fill them after login
// const initialEmails = { inbox: [], sent: [], drafts: [], trash: [], starred: [] };

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Inbox");
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeFolderID, setActiveFolderID] = useState(null);
  // const [emails, setEmails] = useState(initialEmails);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isContacting, setIsContacting] = useState(false); // State for showing contact form
  const [maxPageSize, setMaxPageSize] = useState(5);
  const [page, setPage] = useState(0); // State for managing page number
  const [searching, setSearching] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    datetime: '',
    sender: '',
    receiver : '',
    subject : '',
    body : ''
  });

  const [folders, setFolders] = useState([]);
  const [Categories, setCategories] = useState([]);

  const [selectedEmails, setSelectedEmails] = useState([]); // Track selected emails
  const [selectedEmail, setSelectedEmail] = useState(null); // State for the selected email
  const [isModalOpen, setIsModalOpen] = useState(false);   // State for modal visibility

  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false); // State for move folder modal visibility
  const [selectedFolder, setSelectedFolder] = useState(null); // State for the selected folder
  const [destinationssss, setDestinationssss] = useState(null);
  const [isDraftFolderModalOpen, setDraftFolderModalOpen] = useState(false); 
  const [selectedDraftEmail, setSelectedDraftEmail] = useState(null);
  const [rankState, setRankState] = useState("Default");

  const toggleRankState = async () => {
    // Determine the next state
    const states = ["Default", "Descending", "Ascending"];
    const nextState = states[(states.indexOf(rankState) + 1) % states.length];
    // if(nextState != "Default"){setFiltering(true)}
    // else{setFiltering(false)}
    setRankState(nextState);
    const order = nextState === "Ascending"; // true for ascending, false for descending
    const criteria = "priority"; // Replace with your actual sorting criteria
    // const folderID = 53;    // Replace with your actual folder ID
    try {
      const response = await axios.get(
        `http://localhost:8080/email/sort/${criteria}/${activeFolderID}/${order}/${maxPageSize}/${page}`
      );
      console.log("Sorted emails:", response.data); 
      setActiveFolder(response.data);
    } catch (error) {
      console.error("Failed to sort emails:", error.response?.data || error.message);
    }
  };
 
  const openDraftFolderModal = () => {
    setDraftFolderModalOpen(true);
  };

  const closeDraftFolderModal = () => {
    setDraftFolderModalOpen(false);
  };


    const handleMoveEmail = async () => {
      console.log(selectedFolder);
      console.log(folders);
      // let wantedfolder;
      // for(let i=0 ;i<folders.length ;i++) {
      //   if(folders[i].name === selectedFolder) {
      //     wantedfolder = folders[i].folderID;
      //   }
      // }
      console.log(selectedFolder);
      console.log(selectedEmails);
      // console.log(wantedfolder);
      // console.log(destinationssss);
      try{
        const response = await axios.post(`http://localhost:8080/email/move/${activeFolderID}/${selectedFolder}/${maxPageSize}/${page}`,
          {
            "emailIDs" : selectedEmails
          }
        );
        setActiveFolder(response.data);
        setSelectedEmails([]);
      }catch(e){
        console.error("Error moving email:", e);
      }
      // Logic for moving the email to the selected folder
      console.log(`Email moved to: ${selectedFolder}`);
      setIsMoveModalOpen(false); // Close the modal after moving
  };
  const handleMoveButtonClick = (emailID) => {
    console.log(activeFolder);
    setDestinationssss(emailID);
    setIsMoveModalOpen(true); // Show the folder selection modal
  };
  const handleReadEmail = async (emailID) => {
    const response = await axios.get(`http://localhost:8080/email/email/${emailID}`);
    console.log(emailID);
    console.log(response.data);
    setSelectedEmail(response.data);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setSelectedEmail(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userId) {
      handleLoginSuccess();
    }
  }, [userId]);

  const handleLoginSuccess = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/email/folders/${userId}`);
      console.log(response);
      const allFolders = response.data;
      setFolders(allFolders);
      setCategories(allFolders.slice(5));
      setActiveFolder((await axios.get(`http://localhost:8080/email/folder/${response.data[0].folderID}/${maxPageSize}/${page}`)).data);
      setActiveFolderID(response.data[0].folderID);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
    setLoggedIn(true);
  };

  const handleAllMail = async (page = 0) => {
    try{
      console.log("main");
      const response = await axios.get(`http://localhost:8080/email/allMail/${userId}/${maxPageSize}/${page}`);
      console.log(response.data);
    }catch (error) {
      console.error("Error fetching all mail:", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('userId'); // Remove userId from localStorage on logout
    setUserId(null);
  };

  const toggleForm = () => {
    setIsCreatingAccount((prev) => !prev);
  };

  const handleSend = (email) => {
    const newSentFolder = emails.Sent;
    newSentFolder.addEmail(email);
    setEmails({ ...emails, Sent: newSentFolder });
  };

  const handleDraft = (draft) => {
    const newDraftsFolder = emails.Drafts;
    newDraftsFolder.addEmail(draft);
    setEmails({ ...emails, Drafts: newDraftsFolder });
  };

  const toggleContactForm = () => {
    setIsContacting((prev) => !prev); // Toggles visibility of contact form
  };

  const handlePageChange = async (direction) => {
    if(maxPageSize == activeFolder.length && direction == 1){
      let response;
      if(!searching && !filtering){
        response = await axios.get(`http://localhost:8080/email/folder/${activeFolderID}/${maxPageSize}/${page+1}`);
      }
      else if(searching){
        console.log("hello");
        response = await axios.get(
          `http://localhost:8080/email/searchEmails/${activeFolderID}/${searchQuery}/${maxPageSize}/${page+1}`
        );
        setActiveFolder(response.data);
      }
      else if(filtering){
        response = await axios.post(`http://localhost:8080/email/filterEmails/${activeFolderID}/${"and"}/${maxPageSize}/${page+1}`,filterOptions);
        setActiveFolder(response.data);
      }
      if(response.data != ""){
        setActiveFolder(response.data);
        setPage(page + 1);
      }
    }
    else if(page != 0 && direction == -1){
      if(!searching && !filtering){
        setActiveFolder((await axios.get(`http://localhost:8080/email/folder/${activeFolderID}/${maxPageSize}/${page-1}`)).data);
      }
      else if(searching){
        console.log("hello");
        const response = await axios.get(
          `http://localhost:8080/email/searchEmails/${activeFolderID}/${searchQuery}/${maxPageSize}/${page-1}`
        );
        setActiveFolder(response.data);
      }
      else if(filtering){
        const response = await axios.post(`http://localhost:8080/email/filterEmails/${activeFolderID}/${"and"}/${maxPageSize}/${page-1}`,filterOptions);
        setActiveFolder(response.data);
      }
      setActiveFolder((await axios.get(`http://localhost:8080/email/folder/${activeFolderID}/${maxPageSize}/${page-1}`)).data);
      setPage(page - 1);
    }
  };

  const handleFolderChange = (menu) => {
    setActiveMenu(menu);
    setPage(0); // Reset page to 0 when switching folders
  };




  const handleDelete = async (emailID) =>{
    let trashID;
    for(let i=0 ;i<folders.length ;i++) {
      if(folders[i].name === "trash") {
        trashID = folders[i].folderID;
      }
    }
    const response = await axios.delete(`http://localhost:8080/email/deleteEmail/${emailID}/${activeFolderID}/${trashID}/${maxPageSize}/${page}`);
    setActiveFolder(response.data);
  }

  const handleStarred = async (emailID) =>{
    let starredID;
    for(let i=0 ;i<folders.length ;i++) {
      if(folders[i].name === "starred") {
        starredID = folders[i].folderID;
      }
    }
    const response = await axios.post(`http://localhost:8080/email/star/${emailID}/${starredID}/${activeFolderID}/${maxPageSize}/${page}`);
    setActiveFolder(response.data);
  }

  const handleEmailSelect = (emailID) => {
    setSelectedEmails((prevSelectedEmails) => {
      if (prevSelectedEmails.includes(emailID)) {
        return prevSelectedEmails.filter((id) => id !== emailID); // Deselect email
      } else {
        return [...prevSelectedEmails, emailID]; // Select email
      }
    });
  };
  const handleBulkMove = async () => {
    handleMoveButtonClick();
    console.log(selectedFolder);
    console.log(selectedEmails);
    if (selectedEmails.length > 0 && selectedFolder) {
      console.log("Moving emails to:", selectedFolder);
      const response = await axios.post(`http://localhost:8080/email/move/${activeFolderID}/${selectedFolder}/${maxPageSize}/${page}`,
        {
          "emailIDs": selectedEmails
        });
      setActiveFolder(response.data);
    }
  };
  
  const handleBulkDelete = async () => {
    if (selectedEmails.length > 0) {
      console.log("Deleting emails:", selectedEmails);
      const response = await axios.post(`http://localhost:8080/email/movetoTrash/${activeFolderID}/${folders[3].folderID}/${maxPageSize}/${page}`,
        {
          "emailIDs": selectedEmails
        });
      setActiveFolder(response.data);
      setSelectedEmails([]);
    }
  };

  const handleRestoreEmail = async (emailID) => {
    const response = await axios.post(`http://localhost:8080/email/restoreEmail/${emailID}/${activeFolderID}/${maxPageSize}/${page}`);
    setActiveFolder(response.data);
  }

  const handleDraftEmail = (emailID) => {
    const draftEmail = activeFolder.find((email) => email.emailID === emailID); // Find the draft email data
    setSelectedDraftEmail(draftEmail); // Set the selected draft email
    openDraftFolderModal(); // Open the modal
  };

  return (
    <div className="app">
      {!loggedIn ? (
        isCreatingAccount ? (
          <CreateAccount toggleForm={toggleForm} setUserId={(id) => {
            setUserId(id);
            localStorage.setItem('userId', id); // Store userId in localStorage on login
          }}/>
        ) : (
          <Form toggleForm={toggleForm} setUserId={(id) => {
            setUserId(id);
            localStorage.setItem('userId', id); // Store userId in localStorage on login
          }} />
        )
      ) : (
        <>
          <Header userId={userId} 
                  onLogout={handleLogout} 
                  activeFolderID={activeFolderID} 
                  maxPageSize={maxPageSize} 
                  page={page} 
                  setSearching={setSearching}
                  searching={searching}
                  filtering={filtering}
                  setFiltering={setFiltering}
                  setActiveFolder={setActiveFolder}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterOptions={filterOptions} 
                  setFilterOptions={setFilterOptions}/>
          <div className="app-layout">
            <div className="left-sidebar">
              <Menu
                userId = {userId}
                activeMenu={activeMenu}
                setActiveFolder={setActiveFolder}
                activeFolderID={activeFolderID}
                setActiveFolderID={setActiveFolderID}
                setActiveMenu={handleFolderChange}
                onSend={handleSend}
                onDraft={handleDraft}
                handleLoginSuccess={handleLoginSuccess}
                handleAllMail={handleAllMail}
                folders ={folders}
                categories={Categories}
                setCategories={setCategories}
                maxPageSize={maxPageSize}
                page={page}
                setPage={setPage}
                setSearching={setSearching}
                setFiltering={setFiltering}
              />
              <button className="contact-btn" onClick={toggleContactForm}>
                Contact
              </button>
            </div>

            <div className="content" style={{ padding: "0px" }}>

              <div style={{ display: "flex" , marginTop: "-50px", position:"fixed", zIndex: "3"}}>
                <h2 style={{width: "100px", marginLeft: "-35px"}}>{activeMenu}</h2>
                <div style={{ display: "flex", marginLeft: "100px" }}>
                <button
                    className="rank-button"
                    style={{
                      marginLeft: "-100px",
                      marginTop:"-2px",
                      height:"40px",
                      padding: "2px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundColor:
                        rankState === "Default"
                          ? "#f0f0f0"
                          : rankState === "Descending"
                          ? "#d0e6a5"
                          : "#f4b4b4",
                      minWidth: "90px", // Minimum width to make sure all text fits
                      textAlign: "center", // Center text within the button
                    }}
                    onClick={toggleRankState}
                    >
                    {rankState === "Default"
                      ? "Default"
                      : rankState === "Descending"
                      ? "Descending"
                      : "Ascending"}
                </button>

                  <button className="pages-button" style={{ marginLeft: "1300px", marginRight: "10px" }} onClick={() => handlePageChange(-1)} disabled={page === 0}>
                    <FaArrowLeft />
                  </button>
                  <button className="pages-button" onClick={() => handlePageChange(1)}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              {selectedEmails.length > 0 && (
                <div className="bulk-actions">
                  <button onClick={handleBulkMove}>Move Selected</button>
                  <button onClick={handleBulkDelete}>Delete Selected</button>
                </div>
              )}

              <div className="email-list" style={{width:"1550px"}}>
                {activeFolder && activeFolder.length > 0 ? (
                  activeFolder.map((email) => (
                    <div key={email.emailID} className="email-item">
                      <div className="email-left">
                        <input
                                type="checkbox"
                                checked={selectedEmails.includes(email.emailID)}
                                onChange={() => handleEmailSelect(email.emailID)}
                        />
                        <div className="email-content">
                          <h3>{email.subject}   (priority: <strong>{email.priority})</strong></h3>
                          <p>
                            <strong>From: </strong> {email.sender}
                          </p>
                          <p>
                            <strong>To: </strong> {email.receivers}
                          </p>
                          <p>
                            <strong>Date: </strong> {email.datetime}
                          </p>
                          <p>{email.body}</p>
                        </div>
                      </div>
                      <div className="email-right">
                        
                        <button className="read-button" onClick={() => handleReadEmail(email.emailID)}>Read</button>
                        {folders[3].folderID === activeFolderID ? (
                          <button className="read-button" onClick={() => handleRestoreEmail(email.emailID)}>Restore</button>
                        ) : folders[2].folderID !== activeFolderID ? (
                          <button className="move-button" onClick={() => handleMoveButtonClick(email.emailID)}>Move</button>
                        ) : (
                          <button className="read-button" onClick={() => handleDraftEmail(email.emailID)}>Edit</button>
                        )}
                        <button className="Delete-button" onClick={() => handleDelete(email.emailID)}>< FaTrashAlt /> </button>
                        {(folders[2].folderID != activeFolderID || folders[3].folderID != activeFolderID)&&
                          (<button className="Started-button" onClick={() => handleStarred(email.emailID)}><FaStar /> </button>)
                        }
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No emails in {activeMenu}</p>
                )}
              </div>
              <div className="pagination-controls">
                <span>Page: {page + 1}</span>
              </div>
            </div>
            {/* <div className="right-sidebar"> <Sidebar2 /> </div> */}
          </div>
        </>
      )}
      {/* Move Email Modal */}
      {isMoveModalOpen && (
        <div className="move-folder-modal">
          <div className="move-folder-content">
            <h3>Select a Folder</h3>
            <div>
              {folders.map((folder) => (
                <label key={folder.name}>
                  <input
                    type="radio"
                    name="folder"
                    value={folder.name}
                    onChange={() => setSelectedFolder(folder.folderID)}
                  />
                  {folder.name.charAt(0).toUpperCase() + folder.name.slice(1)}
                </label>
              ))}
            </div>
            <button onClick={handleMoveEmail}>Move</button>
            <button onClick={() => setIsMoveModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

       {/* Draft Modal */}
       <DraftModel
        userId={userId}
        activeMenu={activeMenu}
        setActiveFolder={setActiveFolder}
        activeFolderID={activeFolderID}
        setActiveFolderID={setActiveFolderID}
        setActiveMenu={handleFolderChange}
        onSend={handleSend}
        onDraft={handleDraft}
        handleLoginSuccess={handleLoginSuccess}
        handleAllMail={handleAllMail}
        folders={folders}
        categories={Categories}
        setCategories={setCategories}
        // emailID={emailID}
        maxPageSize={maxPageSize}
        page={page}
        setPage={setPage}
        isOpen={isDraftFolderModalOpen}
        onClose={closeDraftFolderModal}
        draftEmail={selectedDraftEmail} // Pass the selected draft email
      />

      {/* Contact Form Modal */}
      {isContacting && (
        <div className="contact-form-modal">
          <div className="contact-form-content">
            <h3>Contact Us</h3>
            <form>
              <div>
                <label>Name</label>
                <input type="text" placeholder="Your Name" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" placeholder="Your Email" />
              </div>
              <div>
                <label>Message</label>
                <textarea placeholder="Your Message"></textarea>
              </div>
              <button type="submit">Send Message</button>
              <button type="button" onClick={toggleContactForm}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      {isModalOpen && selectedEmail && (
        <EmailModal email={selectedEmail} 
                    setActiveFolder={setActiveFolder}
                    activeFolderID={activeFolderID}
                    maxPageSize={maxPageSize}
                    page = {page}
                    onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
