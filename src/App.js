//Componente principal: configura las rutas de la app.
//Donde la ruta inicial '/' sea el listado de personajes y '/detail' su detalle.
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<CharacterListPage />} />
          <Route path="/detail" element={<CharacterDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
