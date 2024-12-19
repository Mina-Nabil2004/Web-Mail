import React, { useState, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Sidebar2 from "./Sidebar2";
import Form from "./Form";
import CreateAccount from "./CreateAccount";
import ComposeModal from "./ComposeModal";
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

  const [folders, setFolders] = useState([]);
  const [Categories, setCategories] = useState([]);

  const [selectedEmails, setSelectedEmails] = useState([]); // Track selected emails
  const [selectedEmail, setSelectedEmail] = useState(null); // State for the selected email
  const [isModalOpen, setIsModalOpen] = useState(false);   // State for modal visibility

  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false); // State for move folder modal visibility
  const [selectedFolder, setSelectedFolder] = useState(null); // State for the selected folder
  const [destinationssss, setDestinationssss] = useState(null);

    const handleMoveEmail = async () => {
      console.log(selectedFolder);
      console.log(folders);
      let wantedfolder;
      for(let i=0 ;i<folders.length ;i++) {
        if(folders[i].name === selectedFolder) {
          wantedfolder = folders[i].folderID;
        }
      }
      console.log(selectedFolder)
      console.log(wantedfolder);
      console.log(destinationssss);
      try{
        const response = await axios.post(`http://localhost:8080/email/move/${activeFolderID}/${wantedfolder}/${maxPageSize}/${page}`,
          {
            "emailIDs" : [destinationssss]
          }
        );
        setFolders(response.data);
      }catch(e){
        console.error("Error moving email:", e);
      }
      // Logic for moving the email to the selected folder
      console.log(`Email moved to: ${selectedFolder}`);
      setIsMoveModalOpen(false); // Close the modal after moving
  };
  const handleMoveButtonClick = (emailID) => {
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
      setFolders(allFolders.slice(0,5));
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
      const response = await axios.get(`http://localhost:8080/email/folder/${activeFolderID}/${maxPageSize}/${page+1}`);
      if(response.data != ""){
        setActiveFolder(response.data);
        setPage(page + 1);
      }
    }
    else if(page != 0 && direction == -1){
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
  const handleBulkMove = () => {
    if (selectedEmails.length > 0 && selectedFolder) {
      // Logic to move the selected emails to the selected folder
      console.log("Moving emails to:", selectedFolder);
      // Meow API call to delete the selected emails
    }
  };
  
  const handleBulkDelete = () => {
    if (selectedEmails.length > 0) {
      // Logic to delete the selected emails
      console.log("Deleting emails:", selectedEmails);
      // Meow API call to delete the selected emails
    }
  };

  const handleRestoreEmail = async (emailID) => {
    const response = await axios.post(`http://localhost:8080/email/restoreEmail/${emailID}/${activeFolderID}/${maxPageSize}/${page}`);
    setActiveFolder(response.data);
  }

  const handleDraftEmail = (emailID) => {
    
  }

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
                  setActiveFolder={setActiveFolder} />
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
              />
              <button className="contact-btn" onClick={toggleContactForm}>
                Contact
              </button>
            </div>

            <div className="content" style={{ padding: "0px" }}>

              <div style={{ display: "flex" , marginTop: "-50px", position:"fixed", zIndex: "3"}}>
                <h2 style={{width: "100px", marginLeft: "-35px"}}>{activeMenu}</h2>
                <div style={{ display: "flex", marginLeft: "100px" }}>
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
                          <h3>{email.subject}</h3>
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
                        {folders[3].folderID != activeFolderID ?
                          (<button className="move-button" onClick={() => handleMoveButtonClick(email.emailID)}>Move</button>):
                          folders[2].folderID != activeFolderID ?
                          (<button className="read-button" onClick={() => handleRestoreEmail(email.emailID)}>Restore</button>):
                          (<button className="read-button" onClick={() => handleDraftEmail(email.emailID)}>Edit</button>)
                        }
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
              {["inbox", "sent", "drafts", "trash", "starred"].map((folderName) => (
                <label key={folderName}>
                  <input
                    type="radio"
                    name="folder"
                    value={folderName}
                    onChange={() => setSelectedFolder(folderName)}
                  />
                  {folderName.charAt(0).toUpperCase() + folderName.slice(1)}
                </label>
              ))}
            </div>
            <button onClick={handleMoveEmail}>Move</button>
            <button onClick={() => setIsMoveModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

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
