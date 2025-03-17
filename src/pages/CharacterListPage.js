import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import "../styles/characterList.css";

//recibimos funciones addFavorite y deleteFavorite como prop y se lo pasamos a CharacterCard
function CharacterList({
  favorites,
  addFavorite,
  deleteFavorite,
  showFavorites,
}) {
  //declaramos estados:
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
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
      setCharacters(data.items);
    } catch (error) {
      setError(
        "An unexpected error has occurred. Unable to get characters at this time. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  // Filtrar personajes según el término de búsqueda
  const filteredCharacters = (showFavorites ? favorites : characters).filter(
    (char) => char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSearch(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  // Cálculo de índices para la paginación
  const iLastItem = currentPage * itemsPerPage;
  const iFirstItem = iLastItem - itemsPerPage;
  const currentCharacters = filteredCharacters.slice(iFirstItem, iLastItem);

  return (
    <div className="mainBox">
      {!showFavorites && (
        <SearchBar handleSearch={handleSearch} id="mainSearchBar" />
      )}
      {!showFavorites ? (
        <div className="mt-3">
          <span className="text-start">{currentCharacters.length} results</span>{" "}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-danger">{error}</div>
          ) : (
            <div className="charactersMainContainer">
              <div className="charactersContainer g-4 mt-5">
                {currentCharacters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isFavorite={favorites.some(
                      (fav) => fav.id === character.id
                    )}
                    addFavorite={addFavorite}
                    deleteFavorite={deleteFavorite}
                  />
                ))}
              </div>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredCharacters.length} // Modificación: total de elementos filtrados
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-start">Favorites</h2>
          <SearchBar
            handleSearch={handleSearch}
            id="favoritesSearchBar"
            className="mb-3"
          />
          <span className="text-start">
            {filteredCharacters.length} results
          </span>{" "}
          {/* Modificación: mostrar resultados filtrados */}
          <div className="charactersContainer g-4 mt-5">
            {filteredCharacters.map((character) => (
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
