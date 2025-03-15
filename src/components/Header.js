import React from "react";
import { FaHeart } from "react-icons/fa";
import logo from "../images/logo-bg.png";
import "../styles/header.css";

function Header({ favoriteCount, toggleFavorites }) {
  return (
    <header className="header">
      <div className="header-left">
        <a href="/">
          <img src={logo} alt="Dragon Ball" className="" />
        </a>
      </div>
      <div className="header-right">
        <button className="btn" onClick={toggleFavorites}>
          <FaHeart className="heart-icon" />
          <span>{favoriteCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
