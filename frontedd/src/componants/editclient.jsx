import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  // Charger les données du client
  useEffect(() => {
    axios.get(`http://localhost:3000/clients/${id}`)
      .then(res => {
        setClient(res.data);
        setNom(res.data.nom);
        setEmail(res.data.email);
        setTelephone(res.data.telephone);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/clients/${id}`, { nom, email, telephone });
      setMessage("Client mis à jour avec succès !");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la mise à jour !");
    }
  };

  if (!client) return <p className="text-center mt-20 text-gray-600">Chargement du client...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Modifier Client</h2>
        
        {message && (
          <p className={`mb-4 text-center font-medium ${message.includes("succès") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            value={nom}
            onChange={e => setNom(e.target.value)}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            placeholder="Nom"
            required
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            placeholder="Email"
            required
          />
          <input
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
            className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            placeholder="Téléphone"
            required
          />
          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition-colors shadow-md flex-1"
            >
              Valider
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-500 text-white px-5 py-2 rounded-xl hover:bg-gray-600 transition-colors shadow-md flex-1"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClientPage;
