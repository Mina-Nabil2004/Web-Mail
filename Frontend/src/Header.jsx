import React, { useEffect, useState } from "react";
import "./Header.css";
import FilterWindow from './FilterWindow';
import logoMail from "/src/assets/logoMAIL.jpg";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ProfileMenu from "./ProfileMenu";
import axios from "axios";

const Header = ({ userId, onLogout, searchQuery, setSearchQuery, onSearch}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState({ });
  const [initial, setInitial] = useState();
  const [filterWindowOpen, setFilterWindowOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({ date: '', sender: '' });

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prevState) => !prevState);
  };

  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    async function fetchUserDetails() {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/email/user/${userId}`);
          console.log(response.data);
          setUser(response.data); // Assuming response.data contains { username, email }
          console.log(response.data.username.charAt(0).toUpperCase());
          setInitial(response.data.username.charAt(0).toUpperCase());
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    }
    fetchUserDetails();
  }, [userId]); // Dependency on userId

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery,1);
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleFilterClick = () => {
    setFilterWindowOpen(true);
  };

  const handleCloseFilterWindow = () => {
    setFilterWindowOpen(false);
  };

  const handleApplyFilter = (filterOptions) => {
    console.log("Applied filters:", filterOptions);
    // Apply the filter logic here
    setFilterWindowOpen(false);
  };
  return (
    <header className="header">
      <div className="header-left">
        <img src={logoMail} alt="Logo" className="logo" />
        <h2>Mail Website</h2>
      </div>
      <div className="header-center">
      <button className="search-button" onClick={handleSearchClick}>
          <SearchIcon />
        </button>
       <input
        type="text"
        className="search-bar"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchInputChange} 
        />
        {/* <button className="search-button" onClick={handleSearchClick}>
          <i className="material-icons">search</i>
        </button> */}
        <button className="search-button" onClick={handleFilterClick}>
          <TuneIcon />
        </button>
      </div>
      {/* Filter Modal */}
      {filterWindowOpen && (
        <FilterWindow
          onClose={handleCloseFilterWindow}
          onApplyFilter={handleApplyFilter}
        />
      )}
      <div className="header-right">
        {/* <button className="icon-button">
          <i className="material-icons">apps</i>
        </button>
        <button className="icon-button">
          <i className="material-icons">notifications</i>
        </button> */}

        <div className="user-profile" onClick={toggleProfileMenu}>
          {/* <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="user-avatar"
          /> */}
          {initial}
        </div>

        {profileMenuOpen && (
          <ProfileMenu user={user} onLogout={onLogout} closeProfileMenu={closeProfileMenu} />
        )}
      </div>

    </header>
  );
};

export default Header;
