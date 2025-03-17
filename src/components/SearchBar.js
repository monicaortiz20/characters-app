import React from 'react';
import PropTypes from 'prop-types';
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

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default SearchBar;
