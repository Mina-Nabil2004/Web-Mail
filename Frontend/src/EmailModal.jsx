import React from "react";
import "./EmailModal.css";

const EmailModal = ({ email, onClose }) => {
    console.log(email);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{email.subject}</h2>
        <p><strong>From:</strong> {email.sender}</p>
        <p><strong>To:</strong> {email.receivers.join(", ")}</p>
        <p><strong>Date/Time:</strong> {email.datetime}</p>
        <p><strong>Body:</strong></p>
        <p>{email.body}</p>
        <div>
          <h3>Attachments:</h3>
          {email.attachments.length > 0 ? (
            email.attachments.map((att) => (
              <div key={att.attachmentID}>
                <p>{att.attachmentName}.{att.attachmentType}  ({att.attachmentSize} KB)</p>
              </div>
            ))
          ) : (
            <p>No attachments</p>
          )}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EmailModal;
