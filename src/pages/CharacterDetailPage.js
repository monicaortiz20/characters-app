import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CharacterDetail() {
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={characterDetail.image}
            alt={characterDetail.name}
            className="img-fluid"
          />
          <div className="col-md-8">
            <h1>{characterDetail.name}</h1>
            <p>{characterDetail.description}</p>
            <h3>Transformations</h3>
            <ul>
              {characterDetail.transformations.map((trans, index) => (
                <li key={index}>
                  {trans.name} - ki: {trans.ki}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
