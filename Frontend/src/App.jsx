import React, { useState, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Sidebar2 from "./Sidebar2";
import Form from "./Form";
import CreateAccount from "./CreateAccount";
import ComposeModal from "./ComposeModal";
import { Inbox } from "./folders";
import { FolderFactory } from "./folders";
import "./App.css";
import axios from "axios";

// Initializing folders as an empty object, we'll fill them after login
const initialEmails = {inbox: [], sent: [], drafts: [], trash: [], starred: [] };

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [activeMenu, setActiveMenu] = useState({});
  const [activeFolder, setActiveFolder] = useState(null);
  const [emails, setEmails] = useState(initialEmails);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (userId != null) handleLoginSuccess();
  }, [userId]);

  const handleLoginSuccess = async () => {
    console.log(userId);
    try {
      const response = await axios.get(`http://localhost:8080/email/folders/${userId}`);
      console.log(response);
  
      response.data.forEach(async (folderData) => {
        const folder = FolderFactory.createFolder(folderData.name.toLowerCase(), folderData.folderID);
        console.log(`Created folder: ${folderData.name} with ID: ${folderData.folderID}`);
        
        if (folder instanceof Inbox) {
          try {
            const folderEmails = await axios.get(`http://localhost:8080/email/folder/${folderData.folderID}/0`);
            folder.addEmails(folderEmails.data);
            emails.inbox = folderEmails.data;
            setActiveFolder(folder);
            console.log(folder.getEmails());
          } catch (emailError) {
            console.error("Error fetching emails for inbox:", emailError);
          }
        }
      });
  } catch (error) {
    console.error("Error fetching folders:", error);
  }
  setLoggedIn(true);
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
                setActiveMenu={setActiveMenu}
                onSend={handleSend}
                onDraft={handleDraft}
              />
            </div>
            <div className="content">
              <h2>{activeMenu}</h2>
              <div className="email-list">
                {activeFolder && activeFolder.getEmails().length > 0 ? (
                  activeFolder.getEmails().map((email) => (
                      <div key={email.emailID} className="email-item">
                        <h3>{email.subject}</h3>
                        <p><strong>From:</strong> {email.sender}</p>
                        <p><strong>Received:</strong> {email.received}</p>
                        <p>{email.body}</p>
                      </div>
                    ))
                ) : (
                  <p>No emails in {activeMenu}</p>
                )}
              </div>
            </div>
            <div className="right-sidebar">
              <Sidebar2 />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
