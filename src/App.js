//Componente principal: configura las rutas de la app.
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  //estado para almacenar los favoritos
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  function addFavorite(character) {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  }

  function deleteFavorite(character) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== character.id)
    );
  }

  function toggleFavorites() {
    setShowFavorites(!showFavorites);
  }
  return (
    <Router>
      <Header
        favoriteCount={favorites.length}
        toggleFavorites={toggleFavorites}
        showFavorites={showFavorites}
      />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <CharacterListPage
                favorites={favorites}
                addFavorite={addFavorite}
                deleteFavorite={deleteFavorite}
                showFavorites={showFavorites}
              />
            }
          />
          <Route
            path="/detail/:id"
            element={
              <CharacterDetailPage
                favorites={favorites}
                addFavorite={addFavorite}
                deleteFavorite={deleteFavorite}
                showFavorites={showFavorites}
                toggleFavorites={toggleFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
