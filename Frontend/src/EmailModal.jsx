import React, { useState } from "react";
import "./EmailModal.css";

const EmailModal = ({ email, onClose, builder }) => {
  const [attachments, setAttachments] = useState(email.attachments);

  // Remove Attachment
  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    builder.setAttachments(newAttachments); // Pass updates to the builder
  };

  // Open Attachment in a New Tab
  const handleOpenAttachment = (attachment) => {
    try {
      // Extract base64 data after the comma (e.g., "data:image/jpeg;base64,...")
      const base64Data = attachment.data.split(",")[1];

      // Decode base64 data into binary
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

      // Create a blob and open in a new tab
      const blob = new Blob(byteArrays, { type: attachment.attachmentType });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
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
        <p><strong>Date/Time:</strong> {email.datetime}</p>
        <p><strong>Body:</strong></p>
        <p>{email.body}</p>

        <div>
          <h3>Attachments:</h3>
          {attachments.length > 0 ? (
            attachments.map((att, index) => (
              <div key={att.attachmentID} className="attachment-item">
                <p>
                  {att.attachmentName} ({(att.attachmentSize / 1024).toFixed(2)} KB)
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
