import React, { useState, useEffect } from "react";
import "./EditContactWindow.css";
const EditContactWindow = ({ contact, onSave, onCancel }) => {
  const [editedContact, setEditedContact] = useState({ ...contact, addresses: contact.addresses || [] });

  useEffect(() => {
    setEditedContact({ ...contact, addresses: contact.addresses || [] });
  }, [contact]);

  const handleNameChange = (e) => {
    setEditedContact({ ...editedContact, name: e.target.value });
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...editedContact.addresses];
    updatedEmails[index] = value;
    setEditedContact({ ...editedContact, addresses: updatedEmails });
  };

  const handleAddEmailField = () => {
    setEditedContact({ ...editedContact, addresses: [...editedContact.addresses, ""] });
  };

  const handleDeleteEmail = (index) => {
    const updatedEmails = editedContact.addresses.filter((_, i) => i !== index);
    setEditedContact({ ...editedContact, addresses: updatedEmails });
  };

  return (
    <div className="edit-contact-window">
      <h3>Edit Contact</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={editedContact.name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Emails:</label>
        {editedContact.addresses.map((address, index) => (
          <div key={index}>
            <input
              type="email"
              value={address}
              onChange={(e) => handleEmailChange(index, e.target.value)}
            />
            <button onClick={() => handleDeleteEmail(index)}>Delete Email</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddEmailField}>Add Email</button>
      <button onClick={() => onSave(editedContact)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditContactWindow;
