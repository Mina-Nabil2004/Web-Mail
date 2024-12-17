import React, { useState, useEffect } from "react";
import "./ComposeModal.css";
import axios from "axios";
import {Builder} from "./EmailBuilder.jsx"

const ComposeModal = ({ isOpen, onClose, onSend, onDraft }) => {
  if (!isOpen) return null; 
  const [receivers, setReceivers] = useState("");
  const builder = new Builder();
  const userId = localStorage.getItem("userId");

  const handleSend = async (e) => {
    console.log(userId);
    e.preventDefault();
      try{
        const response = await axios.post(`http://localhost:8080/email/send/${userId}`,builder.build())
        console.log(response.data);
      }catch(err){
       }
  };
  const handleDraft = () => {
    // const draft = new Builder()
    //   .setSubject(subject)
    //   .setBody(body)
    //   .setSender(to)
    //   .build();
    // onDraft(draft);
    onClose();
  };

  useEffect(() => {
    setReceivers(builder.getReceivers());
  }, [builder.receivers]);
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
              value={receivers}
              onChange={(e) => builder.setReceivers(e.target.value)}
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
          <div className="modal-actions">
            <button type="submit" className="send-btn">
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