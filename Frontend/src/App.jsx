import React, { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Sidebar2 from "./Sidebar2";
import Form from "./Form";
import CreateAccount from "./CreateAccount";
import ComposeModal from "./ComposeModal";
import { FolderFactory } from "./folders";
import "./App.css";

// Folder setup for email
const inbox = FolderFactory.createFolder("Inbox");
const sent = FolderFactory.createFolder("Sent");
const drafts = FolderFactory.createFolder("Drafts");
const bin = FolderFactory.createFolder("Bin");
const starred = FolderFactory.createFolder("Starred");

const initialEmails = {
  Inbox: inbox,
  Sent: sent,
  Drafts: drafts,
  Bin: bin,
  Starred: starred,
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Inbox");
  const [emails, setEmails] = useState(initialEmails);
  const [userId, setUserId] = useState(null);  // Store userId here

  const handleLoginSuccess = async () => {
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

  // This function will be passed to the Form to get the userId
  const handleUserIdFetched = (id) => {
    setUserId(id);  // Store the userId fetched from the login response
  };

  return (
    <div className="app">
      {!loggedIn ? (
        isCreatingAccount ? (
          <CreateAccount toggleForm={toggleForm} />
        ) : (
          <Form onLoginSuccess={handleLoginSuccess} toggleForm={toggleForm} onUserIdFetched={handleUserIdFetched} />
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
                {emails[activeMenu].getEmails().length > 0 ? (
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
