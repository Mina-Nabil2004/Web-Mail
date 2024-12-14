import React, { useState } from "react";
import "./ContactsWindow.css";

const ContactsWindow = ({ onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });
  const [editingIndex, setEditingIndex] = useState(null);

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

  const handleEditContact = (index) => {
    const contactToEdit = contacts[index];
    setNewContact(contactToEdit); // Fill the form with the contact data
    setEditingIndex(index); // Track which contact is being edited
  };

  const handleSaveContact = () => {
    if (editingIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editingIndex] = newContact; // Update the contact with new data
      setContacts(updatedContacts);
      setNewContact({ name: "", email: "" });
      setEditingIndex(null); // Reset the editing mode
    }
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
            <button onClick={() => handleEditContact(index)}>Edit</button>
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
        {editingIndex !== null ? (
          <button onClick={handleSaveContact}>Save Contact</button>
        ) : (
          <button onClick={handleAddContact}>Add Contact</button>
        )}
      </div>
    </div>
  );
};

export default ContactsWindow;
