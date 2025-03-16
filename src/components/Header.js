import React from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../images/dragonBallZ.png";
import "../styles/header.css";

function Header({ favoriteCount, toggleFavorites, showFavorites }) {
  const navigate = useNavigate();

  function handleToggleFavorites() {
    toggleFavorites();
    navigate("/");
  }
  return (
    <header className="header">
      <div className="header-left">
        <a href="/">
          <img src={logo} alt="Dragon Ball" className="" />
        </a>
      </div>
      <div className="header-right">
        <button className="btn" onClick={handleToggleFavorites}>
          <FaHeart className="heart-icon" />
          <span>{favoriteCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
