
import React, { useState } from "react";
import "./ContactsWindow.css";

const ContactsWindow = ({ onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      setContacts([...contacts, newContact]);
      setNewContact({ name: "", email: "" });
    }
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <div className="contacts-window">
      <div className="contacts-header">
        <h3>Contacts</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="contacts-list">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <p>
              <strong>Name:</strong> {contact.name}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <button onClick={() => handleDeleteContact(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="add-contact">
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
    </div>
  );
};

export default ContactsWindow;
