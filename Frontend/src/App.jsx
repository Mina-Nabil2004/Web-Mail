import React, { useState, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Sidebar2 from "./Sidebar2";
import Form from "./Form";
import CreateAccount from "./CreateAccount";
import ComposeModal from "./ComposeModal";
import { Inbox, Sent, Drafts, Trash, Starred } from "./folders";
import { FolderFactory } from "./folders";
import "./App.css";
import axios from "axios";

// Initializing folders as an empty object, we'll fill them after login
const initialEmails = { inbox: [], sent: [], drafts: [], trash: [], starred: [] };

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Inbox");
  const [activeFolder, setActiveFolder] = useState(null);
  const [emails, setEmails] = useState(initialEmails);
  const [userId, setUserId] = useState(null);
  const [isContacting, setIsContacting] = useState(false); // State for showing contact form
  const [page, setPage] = useState(0); // State for managing page number

  useEffect(() => {
    if (userId != null) handleLoginSuccess();
  }, [userId]);

  useEffect(() => {
    if (activeFolder) {
      fetchEmailsForActiveFolder(page);
    }
  }, [activeFolder, page]);

  const handleLoginSuccess = async () => {
    console.log(userId);
    try {
      const response = await axios.get(`http://localhost:8080/email/folders/${userId}`);
      console.log(response);

      response.data.forEach(async (folderData) => {
        const folder = FolderFactory.createFolder(folderData.name.toLowerCase(), folderData.folderID);
        console.log(`Created folder: ${folderData.name} with ID: ${folderData.folderID}`);
        if (folderData.name.toLowerCase() === activeMenu.toLowerCase()) {
          setActiveFolder(folder);
        }
      });
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
    setLoggedIn(true);
  };

  const fetchEmailsForActiveFolder = async (page) => {
    try {
      const folderEmails = await axios.get(
        `http://localhost:8080/email/folder/${activeFolder.folderID}/${page}`
      );
      activeFolder.addEmails(folderEmails.data);
      setEmails((prevEmails) => ({
        ...prevEmails,
        [activeMenu.toLowerCase()]: folderEmails.data,
      }));
      console.log(`Fetched emails for ${activeMenu}, page ${page}:`, folderEmails.data);
    } catch (emailError) {
      console.error(`Error fetching emails for ${activeMenu}, page ${page}:`, emailError);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
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
          <CreateAccount toggleForm={toggleForm} />
        ) : (
          <Form onLoginSuccess={handleLoginSuccess} toggleForm={toggleForm} setUserId={setUserId} />
        )
      ) : (
        <>
          <Header userId={userId} onLogout={handleLogout} />
          <div className="app-layout">
            <div className="left-sidebar">
              <Menu
                activeMenu={activeMenu}
                setActiveFolder={setActiveFolder}
                setActiveMenu={handleFolderChange}
                onSend={handleSend}
                onDraft={handleDraft}
                handleLoginSuccess={handleLoginSuccess}
              />
              <button className="contact-btn" onClick={toggleContactForm}>
                Contact
              </button>
            </div>
            <div className="content">
              <h2>{activeMenu}</h2>
              <div className="email-list">
                {activeFolder && activeFolder.getEmails().length > 0 ? (
                  activeFolder.getEmails().map((email) => (
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
                <button onClick={() => handlePageChange(-1)} disabled={page === 0}>
                  Previous Page
                </button>
                <span>Page: {page + 1}</span>
                <button onClick={() => handlePageChange(1)}>Next Page</button>
              </div>
            </div>
            <div className="right-sidebar">
              <Sidebar2 />
            </div>
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
