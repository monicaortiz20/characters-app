import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "../styles/characterDetail.css";

function CharacterDetail({ favorites }) {
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //traemos datos del personaje correspondiente
  useEffect(() => {
    getCharacterDetail();
  }, [id]);

  async function getCharacterDetail() {
    try {
      setLoading(true);
      const resp = await fetch(
        `https://dragonball-api.com/api/characters/${id}`
      );
      const data = await resp.json();
      console.log("details: " + data);
      //ordenamos las transformaciones
      data.transformations.sort((a, b) => b.ki - a.ki);
      setCharacterDetail(data);
    } catch (error) {
      setError(
        "An unexpected error has occurred. Unable to catch character details. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  const isFavorite = favorites.some((fav) => fav.id === id);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="containerDetail">
      <div className="row">
        <div className="mainboxDetail">
          <div className="dataDetail">
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
                  className={`heart-icon ${isFavorite ? "favorite" : ""}`}
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
              <spam className="no-transformations text-start">
                This character has no transformations.
              </spam>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
