import React from "react";
import CharacterCard from "../components/CharacterCard";

function Favorites({ favorites }) {
  return (
    <div>
      <h1 className="text-start mb-4" Favorites></h1>
      <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
        {favorites.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
