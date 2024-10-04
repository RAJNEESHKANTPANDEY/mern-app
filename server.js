const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json()); // To parse incoming JSON data
app.use(cors()); // To handle CORS

// MongoDB connection (replace with your own connection string)
mongoose.connect('mongodb://127.0.0.1:27017/mern-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a simple schema and model for demonstration
const ItemSchema = new mongoose.Schema({
  name: String,
  salary: String
});
const Item = mongoose.model('test', ItemSchema);

// Simple API route to add an item
app.post('/api/items', (req, res) => {
  const newItem = new Item({ name: req.body.name,salary:req.body.salary });
  console.log(newItem)

  newItem.save()
    .then(() => res.status(201).json({ message: 'Item created successfully' }))
    .catch((err) => res.status(400).json({ error: err }));
});

// API route to fetch all items
app.get('/api/items', (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json({ error: err }));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
