import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clients from "./clients";
import AddClient from "./addclient";
import EditClientPage from "./editclient";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Clients />} />
        <Route path="/add" element={<AddClient/>} />
        <Route path="/edit/:id" element={<EditClientPage />} />
      </Routes>
    </Router>
  );
}

export default App;
