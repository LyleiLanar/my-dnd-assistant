import 'dotenv/config';

const config = {
  auth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  scopes: ['Notes.Read', 'Notes.ReadWrite'],
  redirectUri: process.env.REDIRECT_URI,
};

export default config;
