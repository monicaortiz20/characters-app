//Componente principal: configura las rutas de la app.
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import Header from "./components/Header";
import FavoritesPage from "./pages/FavoritePage";
import "./App.css";

function App() {
  //estado para almacenar los favoritos
  const [favorites, setFavorites] = useState([]);
  function addFavorite(character) {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
  }

  return (
    <Router>
      <Header favoriteCount={favorites.length} />
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={<CharacterListPage addFavorite={addFavorite} />}
          />
          <Route path="/detail" element={<CharacterDetailPage />} />
          <Route
            path="/favorites"
            element={<FavoritesPage favorites={favorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
