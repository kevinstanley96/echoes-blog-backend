const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ STEP 1: Allow CORS for local + Netlify + Render frontend
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'https://dalaichamblog.netlify.app',
  'https://echoes-blog-api.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ STEP 2: Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ STEP 3: Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("📡 MongoDB connected"))
.catch((err) => console.error(err));

// ✅ STEP 4: Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Echoes Blog Backend');
});

// ✅ STEP 5: Routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

const commentRoutes = require('./routes/comments');
app.use('/api/comments', commentRoutes);

// ✅ STEP 6: Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
