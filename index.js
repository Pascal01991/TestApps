// index.js
const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const session = require('express-session');

app.use(session({ secret: 'Ihr geheimer Schlüssel', resave: false, saveUninitialized: true }));

// Middleware zum Parsen von JSON
app.use(express.json());

// API-Routen
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
