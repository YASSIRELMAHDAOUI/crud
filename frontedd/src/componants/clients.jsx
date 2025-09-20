import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState(""); // 🔎 state pour recherche

  useEffect(() => {
    axios
      .get("http://localhost:3000/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce client ?")) return;
    try {
      await axios.delete(`http://localhost:3000/clients/${id}`);
      setClients(clients.filter((client) => client._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔎 filtrage en fonction de l'input
  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()) ||
      client.telephone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Liste des Clients</h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="relative w-full md:w-72">
             <CiSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
             <input
                 type="text"
                 placeholder="Rechercher un client..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
         </div>
         <Link
            to="/add"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md"
         >
            Ajouter un client
         </Link>
       </div>
 
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-blue-50">
              <tr>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Nom</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Email</th>
                <th className="py-3 px-6 text-left text-gray-700 font-medium">Téléphone</th>
                <th className="py-3 px-6 text-center text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400 font-medium">
                    Aucun client trouvé.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client._id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-3 px-6 border-b border-gray-200">{client.nom}</td>
                    <td className="py-3 px-6 border-b border-gray-200">{client.email}</td>
                    <td className="py-3 px-6 border-b border-gray-200">{client.telephone}</td>
                    <td className="py-3 px-6 border-b border-gray-200 flex justify-center gap-2">
                      <Link
                        to={`/edit/${client._id}`}
                        className="bg-yellow-400 text-white px-4 py-1 rounded-lg hover:bg-yellow-500 transition-colors shadow-sm"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clients;
