// controllers/apiController.js
const { google } = require('googleapis');
const config = require('../config/config.js');

exports.getData = async (req, res) => {
  try {
    // OAuth2-Client einrichten
    const oauth2Client = new google.auth.OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      config.google.redirectUri
    );

    

// Überprüfen Sie, ob das Token in der Session vorhanden ist
if (!req.session || !req.session.tokens) {
  return res.redirect('/auth/google');
}

oauth2Client.setCredentials(req.session.tokens);


    // Google Drive API verwenden (Beispiel)
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const response = await drive.files.list();
    res.json(response.data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    res.status(500).send('Interner Serverfehler');
  }
};
