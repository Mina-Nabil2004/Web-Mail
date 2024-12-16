import React, { useState } from "react";
import "./ContactsWindow.css";

const ContactsWindow = ({ onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  const handleAddContact = () => {
    setContacts([...contacts, { name: "", emails: [""] }]);
  };

  const handleContactClick = (index) => {
    setSelectedContactIndex(index);
  };

  const handleSaveContact = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact, index) =>
        index === selectedContactIndex ? updatedContact : contact
      )
    );
    setSelectedContactIndex(null);
  };

  const handleCancelEdit = () => {
    setSelectedContactIndex(null);
  };

  const handleDeleteContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="contacts-window">
      {selectedContactIndex !== null ? (
        <EditContactWindow
          contact={contacts[selectedContactIndex]}
          onSave={handleSaveContact}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="contacts-list-window">
          <h3>Contacts</h3>
          <button onClick={handleAddContact}>Add Contact</button>
          <div className="contacts-list">
            {contacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <p onClick={() => handleContactClick(index)}>
                  {contact.name || "Unnamed Contact"}
                </p>
                <p>{contact.emails.join(", ")}</p>
                <button onClick={() => handleDeleteContact(index)}>
                  Delete Contact
                </button>
              </div>
            ))}
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
};

const EditContactWindow = ({ contact, onSave, onCancel }) => {
  const [editedContact, setEditedContact] = useState({ ...contact });

  const handleNameChange = (e) => {
    setEditedContact({ ...editedContact, name: e.target.value });
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...editedContact.emails];
    updatedEmails[index] = value;
    setEditedContact({ ...editedContact, emails: updatedEmails });
  };

  const handleAddEmailField = () => {
    setEditedContact({
      ...editedContact,
      emails: [...editedContact.emails, ""],
    });
  };

  const handleDeleteEmail = (index) => {
    const updatedEmails = editedContact.emails.filter((_, i) => i !== index);
    setEditedContact({ ...editedContact, emails: updatedEmails });
  };

  return (
    <div className="edit-contact-window">
      <h3>Edit Contact</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={editedContact.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Emails:</label>
        {editedContact.emails.map((email, index) => (
          <div key={index}>
            <input
              type="email"
              value={email}
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
export default ContactsWindow;
