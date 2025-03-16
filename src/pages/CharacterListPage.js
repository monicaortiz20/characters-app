import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import { FaSearch } from "react-icons/fa";
import "../styles/characterList.css";

//recibimos funciones addFavorite y deleteFavorite como prop y se lo pasamos a CharacterCard
function CharacterList({
  favorites,
  addFavorite,
  deleteFavorite,
  showFavorites,
}) {
  //declaramos estados: listado de los personajes, búsqueda, ...
  const [characters, setCharacters] = useState([]);
  const [filterCharacter, setFilterCharacter] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //traemos datos:
  useEffect(() => {
    getCharactersList();
  }, []);

  async function getCharactersList() {
    try {
      setLoading(true);
      const resp = await fetch(
        "https://dragonball-api.com/api/characters?limit=1000"
      );
      const data = await resp.json();
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
  }

  function handleSearch(e) {
    const request = e.target.value.toLowerCase();
    const filteredResults = characters.filter((character) =>
      //buscamos en minúscula por nombre
      character.name.toLowerCase().includes(request)
    );
    //seteamos estado de filtrado:
    setFilterCharacter(filteredResults);
  }

  function handleFavoritesSearch(e) {
    const request = e.target.value.toLowerCase();
    const filteredResults = favorites.filter((fav) =>
      fav.name.toLowerCase().includes(request)
    );
    setFilterCharacter(filteredResults);
  }

  return (
    <div>
      {!showFavorites && (
        <SearchBar handleSearch={handleSearch} id="mainSearchBar" />
      )}
      {!showFavorites ? (
        <div>
          <h3 className="text-center mb-4">{filterCharacter.length} results</h3>
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
                  isFavorite={favorites.some((fav) => fav.id === character.id)}
                  addFavorite={addFavorite}
                  deleteFavorite={deleteFavorite}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-start mb-4">Favorites</h1>
          <SearchBar handleSearch={handleFavoritesSearch} />
          <h3 className="text-center mb-4">{favorites.length} results</h3>
          <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
            {favorites.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isFavorite={true}
                deleteFavorite={deleteFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterList;
