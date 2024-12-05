import { useState } from "react";
import Header from "./Header"; // Assuming you have a Header component
import Menu from "./Menu"; // Import the Menu component
import Sidebar2 from "./Sidebar2"; // Import Sidebar2 component
import Form from "./Form"; // Import the Form component
import CreateAccount from "./CreateAccount"; // Import CreateAccount component
import "./App.css";
import "./Sidebar2.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // State to toggle forms

  const handleLoginSuccess = () => {
    setLoggedIn(true); // Update the state when login is successful
  };

  const toggleForm = () => {
    setIsCreatingAccount((prev) => !prev);
  };

  const [emails, setEmails] = useState([
    {
      id: 1,
      subject: 'Welcome to EmailApp',
      sender: 'info@emailapp.com',
      received: '2024-12-04 09:00 AM',
      body: 'Hello! Welcome to EmailApp. We hope you enjoy using our platform!',
    },
    {
      id: 2,
      subject: 'Your Invoice for November',
      sender: 'billing@emailapp.com',
      received: '2024-12-04 10:15 AM',
      body: 'Dear User, attached is your invoice for the month of November.',
    },
    {
      id: 3,
      subject: 'Meeting Reminder: Project Update',
      sender: 'manager@emailapp.com',
      received: '2024-12-04 11:30 AM',
      body: "Don't forget about the meeting today at 2 PM for the project update.",
    },
  ]);

  return (
    <div className="app">
      {!loggedIn ? (
        isCreatingAccount ? (
          <CreateAccount toggleForm={toggleForm} />
        ) : (
          <Form onLoginSuccess={handleLoginSuccess} toggleForm={toggleForm} />
        )
      ) : (
        // Show the main app after successful login
        <>
          <Header />
          <div className="app-layout">
            {/* Menu on the left side */}
            <div className="left-sidebar">
              <Menu />
            </div>

            {/* Main content in the center */}
            <div className="content">
              <div className="inbox">
                <h2>Inbox</h2>
                <div className="email-list">
                  {emails.map((email) => (
                    <div key={email.id} className="email-item">
                      <h3>{email.subject}</h3>
                      <p>{email.sender}</p>
                      <p>{email.received}</p>
                      <p>{email.body}</p>
                      <button className="read-button">Read More</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar2 on the right side */}
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
