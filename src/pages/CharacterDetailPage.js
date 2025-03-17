import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import '../styles/characterDetail.css';

function CharacterDetail({ favorites, addFavorite, deleteFavorite }) {
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Traemos datos del personaje correspondiente
  useEffect(() => {
    getCharacterDetail();
  }, [id]);

  async function getCharacterDetail() {
    try {
      setLoading(true);
      const resp = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/characters/${id}`
      );
      const data = await resp.json();
      // Ordenamos las transformaciones
      data.transformations.sort((a, b) => b.ki - a.ki);
      setCharacterDetail(data);
    } catch (error) {
      setError(
        'An unexpected error has occurred. Unable to catch character details. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  }

  const isFavorite = favorites.some((fav) => fav.id === characterDetail?.id);

  function handleToggleFavorite() {
    if (isFavorite) {
      deleteFavorite(characterDetail);
    } else {
      addFavorite(characterDetail);
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="containerDetail">
      <div className="">
        <div className="mainboxDetail">
          <div className="dataDetail">
            <div className="square"></div>
            <div className="imgBox">
              <img
                src={characterDetail.image}
                alt={characterDetail.name}
                className="img-fluid"
              />
            </div>
            <div className="description">
              <div className="heartDetail">
                <h1>{characterDetail.name}</h1>
                <FaHeart
                  className={`heart-icon ${isFavorite ? 'favorite' : ''}`}
                  onClick={handleToggleFavorite}
                />
              </div>
              <p>{characterDetail.description}</p>
            </div>
          </div>
        </div>
        <div className="transformationContainer">
          <div className="transformationBox">
            <h2>Transformations</h2>
            {characterDetail.transformations.length !== 0 ? (
              <ul>
                {characterDetail.transformations.map((trans, index) => (
                  <li key={index}>
                    <span>{trans.name}</span>
                    <p>KI: {trans.ki}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="no-transformations text-start">
                This character has no transformations.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CharacterDetail.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

export default CharacterDetail;
