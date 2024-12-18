import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactsWindow.css";
import EditContactWindow from "./EditContactWindow"; // For adding a new contact
import EditContactWindow2 from "./EditContactWindow2"; // For editing an existing contact

const ContactsWindow = ({ onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/email/getContacts/${userId}`);
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [userId]);

  const handleAddContact = () => {
    const newContact = { name: "", addresses: [] }; // Add a new blank contact
    setContacts([...contacts, newContact]); // Add the new contact to the state
    setSelectedContactIndex(contacts.length); // Set the index of the new contact
  };

  const handleContactClick = (index) => {
    setSelectedContactIndex(index);
  };

  const handleSaveContact = async (updatedContact) => {
    try {
      const response = await axios.post(`http://localhost:8080/email/addContact/${userId}/${updatedContact.name}/${updatedContact.addresses}`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
    setSelectedContactIndex(null);
  };

  const handleCancelEdit = () => {
    setSelectedContactIndex(null);
  };

  const handleDeleteContact = async (index) => {
    const contactToDelete = contacts[index];
    try {
      await axios.delete(`http://localhost:8080/email/deleteContact/${contactToDelete.contactID}`);
      setContacts(contacts.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEditContact = (index) => {
    setSelectedContactIndex(index); // Set selected contact for editing
  };

  return (
    <div className="contacts-window">
      {selectedContactIndex !== null ? (
        <EditContactWindow2
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
                <p>{contact.addresses}</p>
                <button onClick={() => handleDeleteContact(index)}>Delete Contact</button>
                <button onClick={() => handleEditContact(index)}>Edit Contact</button>
              </div>
            ))}
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
};
export default ContactsWindow;
