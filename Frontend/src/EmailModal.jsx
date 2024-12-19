import React, { useState } from "react";
import "./EmailModal.css";
import axios from "axios";

const EmailModal = ({ email, onClose, builder }) => {
  const [attachments, setAttachments] = useState(email.attachments);

  // Remove Attachment
  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    builder.setAttachments(newAttachments); // Pass updates to the builder
  };

  // Open Attachment in a New Tab
  const handleOpenAttachment = async (attachment) => {
    try {
      // Fetch the attachment data (assuming it's base64-encoded)
      const response = await axios.get(`http://localhost:8080/email/attachment/${attachment.attachmentID}`);
      const base64Data = response.data.data.split(",")[1];
  
      // Create a data URL for the image
      const imageUrl = `data:${attachment.attachmentType};base64,${base64Data}`;
  
      // Open the image in a new tab by creating an img element in the new window
      const newWindow = window.open();
      newWindow.document.write(`<img src="${imageUrl}" alt="Attachment" />`);
    } catch (error) {
      console.error("Error opening attachment:", error);
      alert("Failed to open the attachment.");
    }
  };
  

  // Download Attachment
  const handleDownloadAttachment = (attachment) => {
    try {
      const base64Data = attachment.data.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: attachment.attachmentType });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = attachment.attachmentName;
      link.click();
    } catch (error) {
      console.error("Error downloading attachment:", error);
      alert("Failed to download the attachment.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{email.subject}</h2>
        <p><strong>From:</strong> {email.sender}</p>
        <p><strong>To:</strong> {email.receivers.join(", ")}</p>
        <p><strong>Date:</strong> {email.datetime}</p>
        <p><strong>Body:</strong></p>
        <p>{email.body}</p>
        <div>
          <h3>Attachments:</h3>
          {attachments.length > 0 ? (
            attachments.map((att, index) => (
              <div key={att.attachmentID} className="attachment-item">
                <p>
                  {att.name} ({(att.size / 1024).toFixed(2)} KB)
                </p>
                <button onClick={() => handleOpenAttachment(att)}>Open</button>
                <button onClick={() => handleDownloadAttachment(att)}>Download</button>
                <button onClick={() => handleRemoveAttachment(index)}>Remove</button>
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
