import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "../styles/header.css";

function Header({ favoriteCount }) {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/favorites">
          <FaHeart className="heart-icon" />
          <span className="favorite-count">{favoriteCount}</span>
        </Link>
      </div>
      <div className="header-right">
        <Link to="/">
          <img src="./images/ball.png" alt="Dragon Ball" className="logo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
