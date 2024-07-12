const express = require('express');
const { MongoClient } = require('mongodb');
const studentsRoute = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware untuk menghubungkan ke database dan meneruskannya ke route
app.use(async (req, res, next) => {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  req.dbClient = client;
  req.db = client.db('dbNextWave');
  next();
});

// Routes
app.use('/api/students', studentsRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
