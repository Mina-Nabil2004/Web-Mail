import React, { useState, useEffect } from "react";
import "./ComposeModal.css";
import axios from "axios";
import {Builder} from "./EmailBuilder.jsx"
import { red } from "@mui/material/colors";
import "./Form.css";

const ComposeModal = ({ isOpen, onClose, userId, setActiveFolder, activeFolderID, maxPageSize, page, onSend, onDraft }) => {
  if (!isOpen) return null; 
  const [receivers, setReceivers] = useState([]);
  const [priority, setPriority] = useState(null);
  const builder = Builder.getInstance();
  // const [rank, setRank] = useState(null);
  const [attachments, setAttachments] = useState([]); // Changed to array for multiple attachments
  const [errors, setErrors] = useState(0);
  console.log(activeFolderID);

  const handleReceiversChange = (e) => {
    const input = e.target.value;
    const emailArray = input.split(",").map((email) => email.trim());
    setReceivers(emailArray); 
    builder.setReceivers(emailArray); 
  };
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      console.log(builder.build());
      const response = await axios.post(`http://localhost:8080/email/send/${userId}/${activeFolderID}/${maxPageSize}/${page}`,builder.build());
      builder.reset();
      setActiveFolder(response.data);
      onClose();
      console.log("Email sent:", response.data);
    } catch (err) {
      setErrors(1);
      console.error("Error sending email:", err);
    }
  };

  const handleDraft = async () => {
    const response = await axios.post(`http://localhost:8080/email/send/${userId}`,builder.build());
    setActiveFolder(response.data);
    builder.reset();
    onClose();
  };
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const newAttachments = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      data: file.data,
    }));
  
    // Read files and update base64 data
    newAttachments.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        file.data = reader.result; // Set the base64 data
        setAttachments((prevAttachments) => {
          const updatedAttachments = [...prevAttachments, file]; // Append new file
          builder.setAttachments(updatedAttachments); // Update builder's attachments
          return updatedAttachments; // Update local state
        });
      };
      reader.readAsDataURL(files[index]); // Read the file data
    });
  };
  

const handleRemoveAttachment = (index) => {
  const newAttachments = attachments.filter((_, i) => i !== index);
  setAttachments(newAttachments);
  builder.setAttachments(newAttachments);
};
const handleOpenAttachment = (attachment) => {
  try {
    // Extract base64 data after the comma (e.g., "data:application/pdf;base64,....")
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
    
    // Create a blob with the appropriate file type
    const blob = new Blob(byteArrays, { type: attachment.type });
    const url = URL.createObjectURL(blob);

    // Open the file in a new tab/window
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error opening attachment:", error);
    alert("Failed to open the attachment.");
  }
};


const handleDownloadAttachment = (attachment) => {
  // Decode the base64 data into binary
  const byteCharacters = atob(attachment.data.split(',')[1]); // Remove the "data:image/png;base64," part
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    byteArrays.push(new Uint8Array(byteNumbers));
  }

  const blob = new Blob(byteArrays, { type: attachment.type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = attachment.name;
  link.click();
};

  return (
    <div className="compose-modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;
        </span>
        {errors === 1 && <div className="form-error">Connot Find Receiver</div>}
        <h2>New Message</h2>
        <form onSubmit={handleSend}>
          <div className="input-group">
            <label htmlFor="received">To</label>
            <input
              className="compose-input"
              type="email"
              id="received"
              placeholder="receivers"
              value={receivers.join(", ")}
              onChange={handleReceiversChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="subject">Subject</label>
            <input
              className="compose-input"
              type="text"
              id="subject"
              placeholder="Subject"
              value={builder.subject}
              onChange={(e) => builder.setSubject(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="body">Message</label>
            <textarea
              className="compose-input"
              id="body"
              placeholder="Write your message here..."
              value={builder.body}
              onChange={(e) => builder.setBody(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{display: "flex", alignItems: "center"}}>
            <label>Priority:</label>
            <div className="radio-group">
              <label style={{marginLeft: "10px"}}>
                <input
                  type="radio"
                  name="rank"
                  value="1"
                  // checked={priority == '1'}
                  onChange={(e) => builder.setPriority(1)}
                />
                1
              </label>
              <label>
                <input
                  type="radio"
                  name="rank"
                  value="2"
                  // checked={priority === 2}
                  onChange={(e) => builder.setPriority(2)}
                />
                2
              </label>
              <label>
                <input
                  type="radio"
                  name="rank"
                  value="3"
                  //  checked={priority === 3}
                  onChange={(e) => builder.setPriority(3)}
                />
                3
              </label>
              <label>
                <input
                  type="radio"
                  name="rank"
                  value="4"
                  // checked={priority === 4}
                  onChange={(e) =>builder.setPriority(4)}
                />
                4
              </label>
            </div>
          </div>


           {/* Attachment input */}
           <div className="input-group">
            <label htmlFor="attachment">Attachment</label>
            <input
              type="file"
              id="attachment"
              onChange={handleAttachmentChange}
              multiple // Allow multiple files
            />
            {attachments.length > 0 && (
              <div>
                <p>Attachments:</p>
                <div className="attachment-container">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="attachment-item">
                        <p>{attachment.name}</p>
                        <p>Size: {attachment.size} bytes</p>
                        <div style={{display: "flex"}}>
                          <button type="button" onClick={() => handleOpenAttachment(attachment)}>Open</button>
                          <button type="button" onClick={() => handleDownloadAttachment(attachment)}>Download</button>
                          <button style={{backgroundColor: "rgb(211, 47, 47)"}} type="button" onClick={() => handleRemoveAttachment(index)}>Remove</button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="modal-actions">
            <button type="submit" className="send-btn" onClick={handleSend}>
              Send
            </button>
            <button type="button" className="draft-btn" onClick={handleDraft}>
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ComposeModal;