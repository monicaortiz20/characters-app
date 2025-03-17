import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/searchBar.css';

function SearchBar({ handleSearch, id }) {
  return (
    <div className="searchBar" id={id}>
      <input
        type="text"
        className="form-control"
        placeholder="SEARCH A CHARACTER..."
        onChange={handleSearch}
      />
      <FaSearch className="search-icon" />
    </div>
  );
}

export default SearchBar;
