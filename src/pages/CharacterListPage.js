import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";

//recibimos la función "añadir Favorito" como prop y se lo pasamos a CharacterCard
function CharacterList({ addFavorite }) {
  //declaramos estados:
  //Estado para el de listado de los personajes
  const [characters, setCharacters] = useState([]);
  //2. Estado para búsqueda de personajes
  const [filterCharacter, setFilterCharacter] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //traemos datos:
  useEffect(() => {
    getCharactersList();
  }, []);

  const getCharactersList = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        "https://dragonball-api.com/api/characters?limit=1000"
      );
      const data = await resp.json();
      console.log(data + "aquí");
      //añadimos los personajes al estado
      setCharacters(data.items.slice(0, 50));
      setFilterCharacter(data.items.slice(0, 50));
    } catch (error) {
      setError(
        "An unexpected error has occurred. Unable to get characters at this time. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const request = e.target.value.toLowerCase();
    const filteredResults = characters.filter((character) =>
      //buscamos en minúscula por nombre
      character.name.toLowerCase().includes(request)
    );
    //seteamos estado de filtrado:
    setFilterCharacter(filteredResults);
  };

  return (
    <div>
      <h1 className="text-center mb-4">🐲Dragon Ball Characters 🌍</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search characters by name"
              onChange={handleSearch}
            />
            <a href="/detail" className="btn btn-success ms-2">
              View Detail
            </a>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
          {filterCharacter.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              addFavorite={addFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
