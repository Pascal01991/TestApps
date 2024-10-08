// routes/auth.js
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const config = require('../config/config');

// Route zum Starten des OAuth2-Flows
router.get('/google', (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    config.google.clientId,      // Ihre Client ID
    config.google.clientSecret,  // Ihr Client Secret
    config.google.redirectUri    // Ihre Redirect URI
  );

  const scopes = [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
    // redirect_uri hier nicht erforderlich
  });

  // Fügen Sie hier das console.log ein
  console.log('Authorization URL:', authorizationUrl);

  res.redirect(authorizationUrl);
});

// **Hier fügen Sie die `/oauth2callback`-Route ein**
router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  const oauth2Client = new google.auth.OAuth2(
    config.google.clientId,
    config.google.clientSecret,
    config.google.redirectUri
  );

  try {
    // Tauschen Sie den Autorisierungscode gegen Token aus
    const { tokens } = await oauth2Client.getToken(code);
    // Setzen Sie die erhaltenen Token beim OAuth2-Client
    oauth2Client.setCredentials(tokens);
    // Speichern Sie die Token in der Session
    req.session.tokens = tokens;
    // Weiterleitung zur geschützten Route
    res.redirect('/api/data');
  } catch (error) {
    console.error('Fehler beim Abrufen des Zugriffstokens', error);
    res.status(500).send('Authentifizierungsfehler');
  }
});

module.exports = router;
