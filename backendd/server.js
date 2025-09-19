const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
// Middleware pour parser le JSON
app.use(express.json());
app.use(cors());
// Connexion à MongoDB Compass (local)
mongoose.connect('mongodb://127.0.0.1:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(err => console.error("Erreur de connexion MongoDB :", err));

// Schéma et modèle pour la collection "clients"
const clientSchema = new mongoose.Schema({
  nom: String,
  email: String,
  telephone: String
});

const Client = mongoose.model('Client', clientSchema);

// --- CREATE : Ajouter un client ---
app.post('/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).send(client);
  } catch (err) {
    res.status(400).send(err);
  }
});

// --- READ : Lister tous les clients ---
app.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.send(clients);
  } catch (err) {
    res.status(500).send(err);
  }
});

// --- READ : Lister un client par ID ---
app.get('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).send("Client non trouvé");
    res.send(client);
  } catch (err) {
    res.status(500).send(err);
  }
});

// --- UPDATE : Modifier un client par ID ---
app.put('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).send("Client non trouvé");
    res.send(client);
  } catch (err) {
    res.status(400).send(err);
  }
});

// --- DELETE : Supprimer un client par ID ---
app.delete('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).send("Client non trouvé");
    res.send("Client supprimé avec succès !");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
