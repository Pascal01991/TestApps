// config/config.js
require('dotenv').config();

module.exports = {
  google: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    apiKey: process.env.API_KEY,
  },
};
