const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("📡 MongoDB connected"))
.catch((err) => console.error(err));

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Echoes Blog Backend');
});

// Routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
