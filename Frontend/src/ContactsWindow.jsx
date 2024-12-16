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
        // const response = await axios.get(`http://localhost:8080/email/getContacts/${userId}`);
        const response = {
          data: [
            {username: "omar", emails: "legendboudy@gmail.com"}
        ]
      };
        setContacts(response.data);
        // console.log(response.data);
        // console.log(contacts);
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
    setContacts([...contacts, { username: "", emails: [""] }]);
    setSelectedContactIndex(contacts.length);
    setContacts(contacts);
  };
  const handleContactClick = (index) => {
    setSelectedContactIndex(index);
  };
  const handleSaveContact = async (updatedContact) => {
    console.log(contacts);
    if (selectedContactIndex === contacts.length) {
      try {
        const response = await axios.post(
          `http://localhost:8080/email/addContact/${userId}/${username}/${email}`,
          {
            username: updatedContact.username,
            emails: updatedContact.emails,
          }
        );
        setContacts((prevContacts) => [...prevContacts, response.data]);
        console.log("Contact added successfully:", response.data);
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    } 
    setSelectedContactIndex(null); 
  };
  const handleCancelEdit = () => {
    setSelectedContactIndex(null); 
  };
  const fetchContactsss = () => {
    setContacts(); 
  };


  // const handleDeleteContact = async (index) => {
  //   const contactToDelete = contacts[index];
  //   try {
  //     await axios.delete(`http://localhost:8080/email/deleteContact/${userId}/${contactToDelete.id}`);
  //     setContacts(contacts.filter((_, i) => i !== index));
  //     console.log("Contact deleted successfully:", contactToDelete.id);
  //   } catch (error) {
  //     console.error("Error deleting contact:", error);
  //   }
  // };
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
                  {contact.username || "Unnamed Contact"}
                </p>
                <p>{contact.emails}</p>
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
  const [editedContact, setEditedContact] = useState({
    ...contact,
    emails: contact.emails || [], 
  });

  const handleNameChange = (e) => {
    setEditedContact({ ...editedContact, username: e.target.value });
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
          value={editedContact.username}
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
