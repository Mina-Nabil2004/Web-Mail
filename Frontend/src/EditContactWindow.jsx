// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ContactsWindow.css";

// // Main ContactsWindow Component
// const ContactsWindow = ({ onClose }) => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContactIndex, setSelectedContactIndex] = useState(null);
//   const userId = localStorage.getItem("userId"); // Assuming userId is saved in localStorage

//   // Fetch contacts from the backend when the component mounts
//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/email/getContacts/${userId}`);
//         setContacts(response.data); // Assuming the response contains the contacts
//       } catch (error) {
//         console.error("Error fetching contacts:", error);
//       }
//     };

//     fetchContacts();
//   }, [userId]);

//   const handleAddContact = () => {
//     // Adding a new empty contact to start editing
//     setContacts([...contacts, { name: "", emails: [""] }]);
//     setSelectedContactIndex(contacts.length); // Set to the new contact's index
//   };

//   const handleContactClick = (index) => {
//     setSelectedContactIndex(index);
//   };

//   const handleSaveContact = async (updatedContact) => {
//     if (selectedContactIndex === contacts.length) {
//       // New contact - send POST request to add it
//       try {
//         const response = await axios.post(
//           `http://localhost:8080/email/addContact/${userId}`,
//           updatedContact
//         );
//         setContacts([...contacts, response.data]); // Add the new contact to the list
//       } catch (error) {
//         console.error("Error adding contact:", error);
//       }
//     } else {
//       // Existing contact - send PUT request to update it
//       try {
//         const response = await axios.put(
//           `http://localhost:8080/email/updateContact/${userId}`,
//           updatedContact
//         );
//         const updatedContacts = [...contacts];
//         updatedContacts[selectedContactIndex] = response.data;
//         setContacts(updatedContacts); // Update the contact in the list
//       } catch (error) {
//         console.error("Error updating contact:", error);
//       }
//     }

//     setSelectedContactIndex(null); // Clear selection after saving
//   };

//   const handleCancelEdit = () => {
//     setSelectedContactIndex(null); // Clear selection when cancelling
//   };

//   const handleDeleteContact = async (index) => {
//     const contactToDelete = contacts[index];

//     try {
//       // Send DELETE request to remove the contact from the backend
//       await axios.delete(`http://localhost:8080/email/deleteContact/${userId}/${contactToDelete.id}`);
//       setContacts(contacts.filter((_, i) => i !== index)); // Remove the contact from state
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };

//   return (
//     <div className="contacts-window">
//       {selectedContactIndex !== null ? (
//         <EditContactWindow
//           contact={contacts[selectedContactIndex]}
//           onSave={handleSaveContact}
//           onCancel={handleCancelEdit}
//         />
//       ) : (
//         <div className="contacts-list-window">
//           <h3>Contacts</h3>
//           <button onClick={handleAddContact}>Add Contact</button>
//           <div className="contacts-list">
//             {contacts.map((contact, index) => (
//               <div key={index} className="contact-item">
//                 <p onClick={() => handleContactClick(index)}>
//                   {contact.name || "Unnamed Contact"}
//                 </p>
//                 <p>{contact.emails.join(", ")}</p>
//                 <button onClick={() => handleDeleteContact(index)}>
//                   Delete Contact
//                 </button>
//               </div>
//             ))}
//           </div>
//           <button onClick={onClose}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// // EditContactWindow Component (Inside ContactsWindow)
// const EditContactWindow = ({ contact, onSave, onCancel }) => {
//   const [editedContact, setEditedContact] = useState({ ...contact });

//   const handleNameChange = (e) => {
//     setEditedContact({ ...editedContact, name: e.target.value });
//   };

//   const handleEmailChange = (index, value) => {
//     const updatedEmails = [...editedContact.emails];
//     updatedEmails[index] = value;
//     setEditedContact({ ...editedContact, emails: updatedEmails });
//   };

//   const handleAddEmailField = () => {
//     setEditedContact({
//       ...editedContact,
//       emails: [...editedContact.emails, ""],
//     });
//   };

//   const handleDeleteEmail = (index) => {
//     const updatedEmails = editedContact.emails.filter((_, i) => i !== index);
//     setEditedContact({ ...editedContact, emails: updatedEmails });
//   };

//   return (
//     <div className="edit-contact-window">
//       <h3>Edit Contact</h3>
//       <div>
//         <label>Name:</label>
//         <input
//           type="text"
//           value={editedContact.name}
//           onChange={handleNameChange}
//         />
//       </div>
//       <div>
//         <label>Emails:</label>
//         {editedContact.emails.map((email, index) => (
//           <div key={index}>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => handleEmailChange(index, e.target.value)}
//             />
//             <button onClick={() => handleDeleteEmail(index)}>Delete Email</button>
//           </div>
//         ))}
//       </div>
//       <button onClick={handleAddEmailField}>Add Email</button>
//       <button onClick={() => onSave(editedContact)}>Save</button>
//       <button onClick={onCancel}>Cancel</button>
//     </div>
//   );
// };

// export default ContactsWindow;
