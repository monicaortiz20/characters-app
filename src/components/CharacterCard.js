import React from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/characterCard.css";

function CharacterCard({ character, addFavorite, deleteFavorite, isFavorite }) {
  const navigate = useNavigate();

  //verificamos si existe como favorito o no
  function handleFavorites() {
    if (isFavorite) {
      deleteFavorite(character);
    } else {
      addFavorite(character);
    }
  }

  function seeCharacterDetail() {
    navigate(`/detail/${character.id}`);
  }

  return (
    <div className="cardBox">
      <div className="containerBox" onClick={seeCharacterDetail}>
        <div className="imgBox">
          <img
            src={character.image}
            className="card-img-top"
            alt={character.name}
          />
        </div>
        <div className="cardBody">
          <h5 className="card-title">{character.name}</h5>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation(); //para que el evento click de 'favorite' no aplique al padre
              handleFavorites();
            }}
          >
            <FaHeart
              className={`heart-icon ${isFavorite ? "text-danger" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
