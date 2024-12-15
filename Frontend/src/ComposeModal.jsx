import React, { useState } from 'react';
import './ComposeModal.css';

const ComposeModal = ({ isOpen, onClose, onSend, onDraft }) => {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [received, setReceived] = useState('');

  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleSend = (e) => {
    e.preventDefault();
    // Create the email object
    const email = {
      id: Date.now(),
      sender,
      subject,
      body,
      received,
      sent: new Date().toLocaleString(),
    };
    // Trigger the onSend callback with the email data
    onSend(email);
    onClose(); // Close the modal after sending
  };

  const handleDraft = () => {
    // Create the draft email object
    const draft = {
      id: Date.now(),
      sender,
      subject,
      body,
      received,
      saved: new Date().toLocaleString(),
    };
    // Trigger the onDraft callback with the draft data
    onDraft(draft);
    onClose(); // Close the modal after saving as draft
  };

  return (
    <div className="compose-modal">
      <div className="modal-content">
        <span className="close-btn" onClick={handleDraft}>
          &times;
        </span>
        <h2>New Message</h2>
        <form onSubmit={handleSend}>
          <div className="input-group">
            <label htmlFor="sender">Sender</label>
            <input className='compose-input'
              type="email"
              id="sender"
              placeholder="Sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="received">Received</label>
            <input className='compose-input'
              type="email"
              id="received"
              placeholder="Received (optional)"
              value={received}
              onChange={(e) => setReceived(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="subject">Subject</label>
            <input className='compose-input'
              type="text"
              id="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="body">Message</label>
            <textarea className='compose-input'
              id="body"
              placeholder="Write your message here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="discard-btn"
              onClick={handleDraft}
            >
              Discard
            </button>
            <button type="submit" className="send-btn">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeModal;
