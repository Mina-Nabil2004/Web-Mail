import React, { useState } from 'react';
import './FilterWindow.css';

const FilterWindow = ({ filterOptions, setFilterOptions, onClose, onApplyFilter }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value
    }));
  };
  const handleApplyFilter = () => {
    onApplyFilter(filterOptions);
    onClose();
  };
  return (
    <div className="filter-window">
      <h3>Filter Options</h3>
      <div className="filter-item">
        <label>Date:</label>
        <input
          type="text"
          name="datetime"
          value={filterOptions.datetime}
          onChange={handleInputChange}
          placeholder=" "
        />
      </div>
      <div className="filter-item">
        <label>Sender:</label>
        <input
          type="text"
          name="sender"
          value={filterOptions.sender}
          onChange={handleInputChange}
          placeholder=" "
        />
      </div>
      <div className="filter-item">
        <label>Reciver:</label>
        <input
          type="text"
          name="receiver"
          value={filterOptions.receiver}
          onChange={handleInputChange}
          placeholder=" "
        />
      </div>
      <div className="filter-item">
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={filterOptions.subject}
          onChange={handleInputChange}
          placeholder=" "
        />
      </div>
      <div className="filter-item">
        <label>Body:</label>
        <input
          type="text"
          name="body"
          value={filterOptions.body}
          onChange={handleInputChange}
          placeholder=" "
        />
      </div>
      <div className="filter-buttons">
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
        <button className="apply-btn" onClick={handleApplyFilter}>Apply Filter</button>
      </div>
    </div>
  );
};
export default FilterWindow;
