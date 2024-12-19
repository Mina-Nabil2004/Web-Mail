import React, { useState, useEffect } from "react";
import "./EditContactWindow2.css";

const EditContactWindow2 = ({ contact, onSave, onCancel }) => {
  console.log("hello");
  console.log(contact);
  const [editedContact, setEditedContact] = useState({
    name: contact.name || "",
    addresses: Array.isArray(contact.addresses) ? contact.addresses : [],
    contactID : contact.contactID
  });
  

  useEffect(() => {
    // Update the state when `contact` prop changes
    setEditedContact({
      name: contact.name || "",
      addresses: Array.isArray(contact.addresses) ? contact.addresses : [],
      contactID : contact.contactID
    });
  }, [contact]);

  const handleNameChange = (e) => {
    setEditedContact((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (index, value) => {
    setEditedContact((prev) => {
      const updatedAddresses = [...prev.addresses];
      updatedAddresses[index] = value;
      return { ...prev, addresses: updatedAddresses };
    });
  };

  const handleAddEmailField = () => {
    setEditedContact((prev) => ({
      ...prev,
      addresses: [...prev.addresses, ""],
    }));
  };

  const handleDeleteEmail = (index) => {
    setEditedContact((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="edit-contact-window" style={{zIndex:"1010"}}>
      <h3>Edit Contact</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={editedContact.name}
          onChange={handleNameChange}
          placeholder="Enter contact name"
        />
      </div>
      <div>
        <label>Emails:</label>
        {editedContact.addresses.map((address, index) => (
          <div key={index} className="email-field">
            <input
              type="email"
              value={address}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder={`${contact.addresses} ${index + 1}`}
            />
            <button onClick={() => handleDeleteEmail(index)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddEmailField}>Add Email</button>
      <div className="action-buttons">
        <button onClick={() => onSave(editedContact)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditContactWindow2;
