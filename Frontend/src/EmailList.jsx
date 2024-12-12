import React from "react";
// import "./EmailList.css"; // Optional: Add styles for the email list

function EmailList({ emails }) {
  return (
    <div className="email-list">
      {emails.length > 0 ? (
        emails.map((email) => (
          <div key={email.id} className="email-item">
            <h3>{email.subject}</h3>
            <p><strong>From:</strong> {email.sender}</p>
            <p><strong>Received:</strong> {email.datetime}</p>
            <p>{email.body}</p>
          </div>
        ))
      ) : (
        <p>No emails found in this folder.</p>
      )}
    </div>
  );
}

export default EmailList;
