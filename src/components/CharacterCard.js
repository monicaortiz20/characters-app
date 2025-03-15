import React from "react";
import { FaHeart } from "react-icons/fa";

function CharacterCard({ character, addFavorite, deleteFavorite, isFavorite }) {
  //verificamos si existe como favorito o no
  function handleFavorites() {
    if (isFavorite) {
      deleteFavorite(character);
    } else {
      addFavorite(character);
    }
  }

  return (
    <div className="col">
      <div className="card h-100 shadow">
        <img
          src={character.image}
          className="card-img-top"
          alt={character.name}
        />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
          <button className="btn btn-primary" onClick={handleFavorites}>
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
