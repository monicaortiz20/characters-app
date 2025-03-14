import React from "react";
import CharacterCard from "../components/CharacterCard";

//Recibe la lista de personajes favoritos como prop desde App.js
function Favorites({ favorites }) {
  return (
    <div>
      <h1 className="text-start mb-4">Favoritos</h1>
      <div className="container">
        <div className="row">
          {favorites.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
