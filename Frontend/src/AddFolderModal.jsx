import React, { useState } from 'react';
import './AddFolderModal.css'; 

const AddFolderModal = ({ isOpen, onClose, onAddFolder }) => {
  const [folderName, setFolderName] = useState('');

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };
  const handleAddFolder = () => {
    if (folderName) {
      onAddFolder(folderName);
      setFolderName('');
    } else {
      alert('Please enter a valid folder name!');
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Add New Folder</h3>
          <div>
            <label>Folder Name:</label>
            <input
              type="text"
              value={folderName}
              onChange={handleFolderNameChange}
              placeholder="Enter folder name"
            />
          </div>
          <div className="modal-buttons">
            <button onClick={handleAddFolder}>Add Folder</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddFolderModal;
