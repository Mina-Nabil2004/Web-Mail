import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactsWindow.css";
import EditContactWindow from "./EditContactWindow"; // For adding a new contact
import EditContactWindow2 from "./EditContactWindow2"; // For editing an existing contact
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList'; // Filter icon import
import FilterWindow2 from "./FilterWindow2";

const ContactsWindow = ({ onClose }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState(null); // For editing
  const [selectedIndex, setSelectedIndex] = useState(null); // For adding
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const userId = localStorage.getItem("userId");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    name : "",
    email: "",
  });

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
  
  const handleFilterClick = () => {
    setIsFilterOpen(true); // Open the filter window
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false); // Close the filter window
  };

  // const handleApplyFilter = (options) => {
  //   console.log("Applying filters with options:", options);
  //   // Perform filtering logic here (e.g., API call or state update)
  //   setIsFilterOpen(false); // Close the filter window after applying filters
  // };

  const handleApplyFilter = async (options) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/email/filterContact/${userId}/name/0`, 
        {
            name: options.name,
            email: options.email  
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
    <div className="contacts-window">
    {selectedIndex !== null && (
      <EditContactWindow
        contact={contacts[selectedIndex]}
        onSave={handleSaveContact}
        onCancel={handleCancelEdit}
      />
    )}

    {selectedContactIndex !== null && (
      <EditContactWindow2
        contact={contacts[selectedContactIndex]}
        onSave={handleSaveContact}
        onCancel={handleCancelEdit}
      />
    )}

    <div className="search-bar-container">
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
      <button className="filter-button" onClick={handleFilterClick}>
        <FilterListIcon />
      </button>
    </div>

    {isFilterOpen && (
      <div className="overlay">
        <FilterWindow2
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={handleCloseFilter}
          onApplyFilter={handleApplyFilter}
        />
      </div>
    )}

    <div className="contacts-list-window">
      <h3>Contacts</h3>
      <button onClick={handleAddContact}>Add Contact</button>
      <div className="contacts-list">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item">
            <p onClick={() => handleEditContact(index)}>
              {contact.name || "Unnamed Contact"}
            </p>
            <p>
              {Array.isArray(contact.addresses)
                ? contact.addresses.join(", ")
                : contact.addresses}
            </p>
            <button onClick={() => handleDeleteContact(index)}>
              Delete Contact
            </button>
            <button onClick={() => handleEditContact(index)}>Edit</button>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);
};

export default ContactsWindow;