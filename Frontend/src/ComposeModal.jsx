import React, { useState, useEffect } from "react";
import "./ComposeModal.css";
import axios from "axios";
import {Builder} from "./EmailBuilder.jsx"

const ComposeModal = ({ isOpen, onClose, onSend, onDraft }) => {
  if (!isOpen) return null; 
  const [receivers, setReceivers] = useState([]);
  const [priority, setPriority] = useState(null);
  const builder = Builder.getInstance();
  const userId = localStorage.getItem("userId");
  // const [rank, setRank] = useState(null);
  const [attachments, setAttachments] = useState([]); // Changed to array for multiple attachments

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
      const response = await axios.post(`http://localhost:8080/email/send/${userId}`,builder.build());
      builder.reset();
      console.log("Email sent:", response.data);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  const handleDraft = async () => {
    const response = await axios.post(`http://localhost:8080/email/send/${userId}`,builder.build());
    builder.reset();
    onClose();
  };
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const newAttachments = files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        data: null, // Placeholder for base64 data
    }));
    // Read files and update base64 data
    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            newAttachments[index].data = reader.result; // Update the base64 data
            setAttachments(newAttachments); // Update local state
            builder.setAttachments(newAttachments); // Update builder's attachments
        };
        reader.readAsDataURL(file);
        console.log(newAttachments);
    });
    setAttachments(newAttachments);
};
  return (
    <div className="compose-modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
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
          <div className="input-group">
            <label>Rank:</label>
            <div className="radio-group">
              <label>
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
                <ul>
                  {attachments.map((attachment, index) => (
                    <li key={index}>
                      <p>{attachment.name}</p>
                      <p>Size: {attachment.size} bytes</p>
                    </li>
                  ))}
                </ul>
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