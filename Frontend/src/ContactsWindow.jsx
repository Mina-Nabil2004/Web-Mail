import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactsWindow.css";

const ContactsWindow = ({ onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchContacts = async () => {
      console.log(userId);
      try {
        const response = await axios.get(`http://localhost:8080/email/getContacts/${userId}`);
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [userId]);
  useEffect(() => {
    console.log("Updated contacts:", contacts);
  }, [contacts]);
  const handleAddContact = () => {
    const newContact = { name: "", addresses: [] }; // Add a new blank contact
    setContacts([...contacts, newContact]); // Add the new contact to the state
    setSelectedContactIndex(contacts.length); // Set the index of the new contact
  };
  const handleContactClick = (index) => {
    setSelectedContactIndex(index);
  };
  const handleSaveContact = async (updatedContact) => {
    console.log("hei");
    console.log(updatedContact);
    console.log(updatedContact.name);
    console.log(updatedContact.addresses);
      try {
        console.log("lo");
        const response = await axios.post(`http://localhost:8080/email/addContact/${userId}/${updatedContact.name}/${updatedContact.addresses}`);
        console.log("lol");
        setContacts(response.data);
        console.log("Contact added successfully:", response.data);
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    setSelectedContactIndex(null); 
  };
  const handleCancelEdit = () => {
    setSelectedContactIndex(null); 
  };
  const fetchContactsss = () => {
    setContacts(); 
  };
  const handleDeleteContact = async (index) => {
    const contactToDelete = contacts[index];
    console.log(contactToDelete);
    try {
      await axios.delete(`http://localhost:8080/email/deleteContact/${contactToDelete.contactID}`);
      setContacts(contacts.filter((_, i) => i !== index));
      console.log("Contact deleted successfully:", contactToDelete.id);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
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
                <p>{contact.addresses}</p>
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
  console.log(contact);
  const [editedContact, setEditedContact] = useState({...contact,addresses: contact.addresses || [],});
  const handleNameChange = (e) => {
    setEditedContact({ ...editedContact, name: e.target.value });
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...editedContact.addresses];
    updatedEmails[index] = value;
    setEditedContact({ ...editedContact, addresses: updatedEmails });
  };

  const handleAddEmailField = () => {
    setEditedContact({...editedContact,addresses: [...editedContact.addresses, ""], 
    });
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
        <input
          type="text"
          value={editedContact.name}
          onChange={handleNameChange}
        />
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

export default ContactsWindow;
