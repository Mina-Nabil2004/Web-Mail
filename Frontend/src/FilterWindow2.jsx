import React, { useState } from 'react';
import './FilterWindow2.css';

const FilterWindow2 = ({ filterOptions, setFilterOptions, onClose, onApplyFilter }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prevOptions) => ({...prevOptions,
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
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={filterOptions.name || ''}
        onChange={handleInputChange}
        placeholder="Enter name"
      />
    </div>
    <div className="filter-item">
      <label>Email:</label>
      <input
        type="text"
        name="email"
        value={filterOptions.email || ''}
        onChange={handleInputChange}
        placeholder="Enter email"
      />
    </div>
      <div className="filter-buttons">
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
        <button className="apply-btn" onClick={handleApplyFilter}>Apply Filter</button>
      </div>
    </div>
  );
};
export default FilterWindow2;
