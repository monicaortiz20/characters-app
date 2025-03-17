import React from 'react';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/characterCard.css';

function CharacterCard({ character, addFavorite, deleteFavorite, isFavorite }) {
  const navigate = useNavigate();

  // Verificamos si existe como favorito o no
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
          <img src={character.image} className="" alt={character.name} />
        </div>
        <div className="cardBody">
          <h6 className="card-title">{character.name}</h6>
          <button
            className="btn"
            onClick={(e) => {
              e.stopPropagation(); // Para que el evento click de 'favorite' no aplique al padre
              handleFavorites();
            }}
          >
            <FaHeart className={`heart-icon ${isFavorite ? 'favorite' : ''}`} />
            ;
          </button>
        </div>
      </div>
    </div>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default CharacterCard;
