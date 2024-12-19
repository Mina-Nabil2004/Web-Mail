import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactsWindow.css";
import EditContactWindow from "./EditContactWindow"; // For adding a new contact
import EditContactWindow2 from "./EditContactWindow2"; // For editing an existing contact
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList'; // Filter icon import
import "./Header.css";
import zIndex from "@mui/material/styles/zIndex";

const ContactsWindow = ({ onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null); // For editing
  const [selectedIndex, setSelectedIndex] = useState(null); // For adding
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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
    try {
      if (selectedIndex !== null) {
        // Add a new contact
        const response = await axios.post(
          `http://localhost:8080/email/addContact/${userId}/${updatedContact.name}/${updatedContact.addresses}`
        );
        setContacts(response.data); // Update contacts with server response
        setSelectedIndex(null);
      } else if (selectedContactIndex !== null) {
        try {
          const response = await axios.post(`http://localhost:8080/email/editContact/${updatedContact.contactID}/${userId}`,
            {
              name: updatedContact.name,
              addresses: updatedContact.addresses.join(",")       
            }
          );
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

  // Cancel editing or adding
  const handleCancelEdit = () => {
    setSelectedIndex(null);
    setSelectedContactIndex(null);
  };

  // Delete contact
  const handleDeleteContact = async (index) => {
    const contactToDelete = contacts[index];
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

  const handleSearchClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/email/filterContact/${userId}/name/0`, 
        {
            name: searchQuery  
        }
      );
      console.log(searchQuery);
      setContacts(response.data);
      console.log(response.data); // Log response data
    } catch (error) {
      console.error("Error searching contacts:", error);
    }
  };
  
  
  
  
  return (
    <div className="contacts-window" style={{marginTop:"100px"}}>
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

      {/* Search Bar and Filter Icon */}
      {selectedIndex === null && selectedContactIndex === null &&(
      <div className="search-bar-container" style={{display: "flex", zIndex:"-1"}}>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearchClick}>
          <SearchIcon />
        </button>
        {/* <button className="filter-button">
          <FilterListIcon />
        </button> */}
      </div>
      )}

      {/* Contacts List */}
      {selectedIndex === null && selectedContactIndex === null && (
        <div className="contacts-list-window">
          <h3>Contacts</h3>
          <button onClick={handleAddContact}>Add Contact</button>

          <div className="contacts-list">
            {contacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <p onClick={() => handleEditContact(index)}>
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
