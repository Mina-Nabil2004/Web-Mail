import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactsWindow.css";
import EditContactWindow from "./EditContactWindow"; // For adding a new contact
import EditContactWindow2 from "./EditContactWindow2"; // For editing an existing contact

const ContactsWindow = ({ onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null); // For editing
  const [selectedIndex, setSelectedIndex] = useState(null); // For adding
  const userId = localStorage.getItem("userId");

  // Fetch contacts on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/email/getContacts/${userId}`
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [userId]);

  // Add a new blank contact
  const handleAddContact = () => {
    const newContact = { name: "", addresses: [] };
    setContacts([...contacts, newContact]);
    setSelectedIndex(contacts.length); 
  };
  const handleSaveContact = async (updatedContact) => {
    console.log(updatedContact);
    console.log(updatedContact.contactID);
    try {
      if (selectedIndex !== null) {
        // Add a new contact
        const response = await axios.post(
          `http://localhost:8080/email/addContact/${userId}/${updatedContact.name}/${updatedContact.addresses}`
        );
        setContacts(response.data); // Update contacts with server response
        setSelectedIndex(null);
      } else if (selectedContactIndex !== null) {
        console.log(contacts);
        console.log(updatedContact.contactID);
          try {
            const response = await axios.post(`http://localhost:8080/email/editContact/${updatedContact.contactID}/${userId}`,
              {
                name: updatedContact.name,
                addresses: updatedContact.addresses.join(",")       
              }
            );
            console.log(response.data);
            setContacts(response.data);
            setSelectedContactIndex(null);
          } catch (error) {
            console.error("Error saving contact:", error);
          }
      }
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };
  // const handleSaveContact = async (index) => {
  //   const updatedContacts = contacts[index]; // Get the contact using the passed index
  
  //   try {
  //     if (selectedIndex !== null) {
  //       // Add a new contact
  //       const response = await axios.post(
  //         `http://localhost:8080/email/addContact/${userId}/${updatedContacts.name}/${updatedContacts.addresses}`
  //       );
  //       setContacts(response.data); // Update contacts with server response
  //       setSelectedIndex(null);
  //     } else if (index !== null) {
  //       // Edit an existing contact, using the passed index to get the correct contact ID
  //       const response = await axios.post(
  //         `http://localhost:8080/email/editContact/${updatedContacts.contactID}`,
  //         updatedContacts
  //       );
  //       const updatedContacts = [...contacts];
  //       updatedContacts[index] = response.data; // Update specific contact at the passed index
  //       setContacts(updatedContacts);
  //       setSelectedContactIndex(null);
  //     }
  //   } catch (error) {
  //     console.error("Error saving contact:", error);
  //   }
  // };
  // Cancel editing or adding
  const handleCancelEdit = () => {
    setSelectedIndex(null);
    setSelectedContactIndex(null);
  };
  // Delete contact
  const handleDeleteContact = async (index) => {
    const contactToDelete = contacts[index];
    console.log(contactToDelete);
    try {
      await axios.delete(
        `http://localhost:8080/email/deleteContact/${contactToDelete.contactID}`
      );
      setContacts(contacts.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  // Edit an existing contact
  const handleEditContact = (index) => {
    setSelectedContactIndex(index);
  };
  return (
    <div className="contacts-window">
      {/* Add Contact Window */}
      {selectedIndex !== null && (
        <EditContactWindow
          contact={contacts[selectedIndex]} // Pass new contact for adding
          onSave={handleSaveContact}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Edit Contact Window */}
      {selectedContactIndex !== null && (
        <EditContactWindow2
          contact={contacts[selectedContactIndex]} // Pass existing contact for editing
          onSave={handleSaveContact}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Contacts List */}
      {selectedIndex === null && selectedContactIndex === null && (
        <div className="contacts-list-window">
          <h3>Contacts</h3>
          <button onClick={handleAddContact}>Add Contact</button>

          <div className="contacts-list">
            {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <p onClick={() => handleContactClick(index)}>
              {contact.name || "Unnamed Contact"}
            </p>
            <p>{Array.isArray(contact.addresses) ? contact.addresses.join(", ") : contact.addresses}</p>
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
