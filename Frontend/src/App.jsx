import React, { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Sidebar2 from "./Sidebar2";
import Form from "./Form";
import CreateAccount from "./CreateAccount";
import ComposeModal from "./ComposeModal";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Inbox");
  const [emails, setEmails] = useState({
    Inbox: [
      {
        id: 1,
        subject: "Welcome to EmailApp",
        sender: "info@emailapp.com",
        received: "2024-12-04 09:00 AM",
        body: "Hello! Welcome to EmailApp. We hope you enjoy using our platform!",
      },
      {
        id: 2,
        subject: "Your Invoice for November",
        sender: "billing@emailapp.com",
        received: "2024-12-04 10:15 AM",
        body: "Dear User, attached is your invoice for the month of November.",
      },
    ],
    Sent: [
      {
        id: 3,
        subject: "Project Update Sent",
        sender: "me@emailapp.com",
        received: "2024-12-03 08:00 PM",
        body: "Sent the project update to the client as discussed.",
      },
    ],
    Drafts: [
      {
        id: 4,
        subject: "Unfinished Email",
        sender: "me@emailapp.com",
        received: "2024-12-02 07:00 PM",
        body: "This is an unfinished draft.",
      },
    ],
    Bin: [],
    Starred: [],
  });

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const toggleForm = () => {
    setIsCreatingAccount((prev) => !prev);
  };

  const handleSend = (email) => {
    setEmails((prev) => ({
      ...prev,
      Sent: [...prev.Sent, email],
    }));
  };

  const handleDraft = (draft) => {
    setEmails((prev) => ({
      ...prev,
      Drafts: [...prev.Drafts, draft],
    }));
  };

  return (
    <div className="app">
      {!loggedIn ? (
        isCreatingAccount ? (
          <CreateAccount toggleForm={toggleForm} />
        ) : (
          <Form onLoginSuccess={handleLoginSuccess} toggleForm={toggleForm} />
        )
      ) : (
        <>
          <Header onLogout={handleLogout} />
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
                {emails[activeMenu].length > 0 ? (
                  emails[activeMenu].map((email) => (
                    <div key={email.id} className="email-item">
                      <h3>{email.subject}</h3>
                      <p>
                        <strong>From:</strong> {email.sender}
                      </p>
                      <p>
                        <strong>Received:</strong> {email.received}
                      </p>
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
