import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddClient() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/clients", { nom, email, telephone });
      setMessage("Client ajouté avec succès !");
      setNom(""); setEmail(""); setTelephone("");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'ajout du client.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Ajouter un client</h2>

        {message && (
          <p className={`mb-4 text-center font-medium ${message.includes("succès") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={e => setNom(e.target.value)}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition-colors shadow-md"
          >
            Ajouter
          </button>
        </form>

        <Link
          to="/"
          className="text-blue-500 mt-4 inline-block text-center hover:underline"
        >
          Retour à la liste des clients
        </Link>
      </div>
    </div>
  );
}

export default AddClient;
