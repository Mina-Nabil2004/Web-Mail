import React, { useState } from 'react';
import './ComposeModal.css'; // Add styling for the modal

const ComposeModal = ({ isOpen, onClose }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');

  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sending the email logic
    alert('Email sent!');
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="compose-modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>New Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="to">To</label>
            <input
              type="email"
              id="to"
              placeholder="Recipient"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="cc">Cc</label>
            <input
              type="email"
              id="cc"
              placeholder="Cc (optional)"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="bcc">Bcc</label>
            <input
              type="email"
              id="bcc"
              placeholder="Bcc (optional)"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="body">Message</label>
            <textarea
              id="body"
              placeholder="Write your message here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="discard-btn" onClick={onClose}>Discard</button>
            <button type="submit" className="send-btn">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeModal;
