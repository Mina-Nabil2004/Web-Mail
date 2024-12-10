import React, { useState } from 'react';
import './ComposeModal.css';

const ComposeModal = ({ user, isOpen, onClose, onSend, onDraft }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');

  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleSend = async (e) => {
    e.preventDefault();
    // Create the email object
    const response = await axios.post('http://localhost:8080/email/compose',{
      "sender": user.email,
      "reciever": to,
      "subject": subject,
      "body": body,
      "datetime": new Date().toLocaleString()
    });
    onSend(response.data);
    onClose();
  };

  const handleDraft = () => {
    // Create the draft email object
    const draft = {
      id: Date.now(),
      to,
      subject,
      body,
      cc,
      bcc,
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
            <label htmlFor="to">To</label>
            <input
              type="email"
              id="to"
              placeholder="Recipient"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
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
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="body">Message</label>
            <textarea
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
