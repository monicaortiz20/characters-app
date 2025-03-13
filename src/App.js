//Componente principal: configura las rutas de la app.
//Donde la ruta inicial '/' sea el listado de personajes y '/detail' su detalle.
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import Header from "./components/Header";
import FavoritesPage from "./pages/FavoritePage";
import "./App.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <Header favoriteCount={favorites.length} />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<CharacterListPage />} />
          <Route path="/detail" element={<CharacterDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
