import React, { useState, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Sidebar2 from "./Sidebar2";
import Form from "./Form";
import CreateAccount from "./CreateAccount";
import ComposeModal from "./ComposeModal";
import { FolderFactory } from "./folders";
import "./App.css";
import axios from "axios";

// Initializing folders as an empty object, we'll fill them after login
const initialEmails = {};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Inbox");
  const [emails, setEmails] = useState(initialEmails);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (userId != null) handleLoginSuccess();
  }, [userId]);

const handleLoginSuccess = async () => {
  console.log(userId);
  try {
    const response = await axios.get(`http://localhost:8088/email/folders/${userId}`);
    console.log(response);

    // Loop through each folder and create it using FolderFactory
    for (let i = 0; i < response.data.length; i++) {
      const folderData = response.data[i];
      const folder = FolderFactory.createFolder(folderData.name, folderData.folderID);
      console.log(`Created folder: ${folderData.name} with ID: ${folderData.folderID}`);

      // Fetch emails for this folder
      const folderEmails = await axios.get(`http://localhost:8088/email/folder/${folderData.folderID}/0`);
      console.log(`Emails in ${folderData.name}:`, folderEmails.data);

      // Add the fetched emails to the folder
      folder.addEmails(folderEmails.data);

      // Update the emails state with the new folder data
      setEmails((prevEmails) => ({
        ...prevEmails,
        [folderData.name]: folder,
      }));
    }
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
                setActiveMenu={setActiveMenu}
                onSend={handleSend}
                onDraft={handleDraft}
              />
            </div>
            <div className="content">
              <h2>{activeMenu}</h2>
              <div className="email-list">
                {emails[activeMenu] && emails[activeMenu].getEmails().length > 0 ? (
                  emails[activeMenu]
                    .getEmails()
                    .map((email) => (
                      <div key={email.id} className="email-item">
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
