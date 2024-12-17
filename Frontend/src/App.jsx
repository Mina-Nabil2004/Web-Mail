import React, { useState, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Sidebar2 from "./Sidebar2";
import Form from "./Form";
import CreateAccount from "./CreateAccount";
import ComposeModal from "./ComposeModal";
import { Inbox, Sent, Drafts, Trash, Starred } from "./folders";
import { FolderFactory } from "./folders";
import "./App.css";
import axios from "axios";

// Initializing folders as an empty object, we'll fill them after login
// const initialEmails = { inbox: [], sent: [], drafts: [], trash: [], starred: [] };

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Inbox");
  const [activeFolder, setActiveFolder] = useState(null);
  // const [emails, setEmails] = useState(initialEmails);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isContacting, setIsContacting] = useState(false); // State for showing contact form
  const [page, setPage] = useState(0); // State for managing page number
  const [searchQuery, setSearchQuery] = useState("");
  const[folders, setFolders] = useState([]);

  useEffect(() => {
    if (userId) {
      handleLoginSuccess();
    }
  }, [userId]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [activeFolder, searchQuery]);

  const handleLoginSuccess = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/email/folders/${userId}`);
      console.log(response);
      setFolders(response.data);
      setActiveFolder((await axios.get(`http://localhost:8080/email/folder/${response.data[0].folderID}/${page}`)).data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
    setLoggedIn(true);
  };

  const handleSearch = async (page = 0) => {
    console.log("Active folder:", activeFolder);
    console.log("Search query:", searchQuery); // Check search query
    try {
      console.log(activeFolder.folderID);
      const response = await axios.get(
        `http://localhost:8080/searchEmails/${activeFolder.folderID}/${searchQuery}/${page}`
      );
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  const handleAllMail = async (page = 0) => {
    try{
      console.log("mian");
      const response = await axios.get(`http://localhost:8080/email/allMail/${userId}/${page}`)
      console.log(response.data)
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

  const handlePageChange = (direction) => {
    setPage((prevPage) => Math.max(0, prevPage + direction));
  };

  const handleFolderChange = (menu) => {
    setActiveMenu(menu);
    setPage(0); // Reset page to 0 when switching folders
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
          <Header userId={userId} onLogout={handleLogout} onSearch={handleSearch} setSearchQuery={setSearchQuery} />
          <div className="app-layout">
            <div className="left-sidebar">
              <Menu
                activeMenu={activeMenu}
                setActiveFolder={setActiveFolder}
                setActiveMenu={handleFolderChange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSend={handleSend}
                onDraft={handleDraft}
                handleLoginSuccess={handleLoginSuccess}
                handleAllMail={handleAllMail}
                folders ={folders}
                page={page}
              />
              <button className="contact-btn" onClick={toggleContactForm}>
                Contact
              </button>
            </div>
            <div className="content">
              <div style={{ display: "flex" }}>
                <h2 style={{width: "90px"}}>{activeMenu}</h2>
                <div style={{ display: "flex", marginLeft: "100px" }}>
                  <button className="pages-button" style={{ marginLeft: "1250px", marginRight: "10px" }} onClick={() => handlePageChange(-1)} disabled={page === 0}>
                    <FaArrowLeft />
                  </button>
                  <button className="pages-button" onClick={() => handlePageChange(1)}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              <div className="email-list">
                {activeFolder && activeFolder.length > 0 ? (
                  activeFolder.map((email) => (
                    <div key={email.emailID} className="email-item">
                      <h3>{email.subject}</h3>
                      <p>
                        <strong>From:</strong> {email.sender}
                      </p>
                      <p>
                        <strong>Received:</strong> {email.received}
                      </p>
                      <p>{email.body}</p>
                      <button className="read-button">Read</button>
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
    </div>
  );
}

export default App;