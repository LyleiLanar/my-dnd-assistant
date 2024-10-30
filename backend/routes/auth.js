import express from 'express';
import axios from 'axios';
import qs from 'qs';
import authConfig from '../config/authConfig.js';

const routes = express.Router();

// Bejelentkezési útvonal
routes.get('/login', (_req, res) => {
  const { clientId } = authConfig.auth;
  const { redirectUri, scopes } = authConfig;

  const authUrl = `${
    process.env.AUTH_BASEURL
  }/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
    ' '
  )}`;
  console.log('Redirecting to:', authUrl);
  res.redirect(authUrl);
});

// Hitelesítési callback
routes.get('/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post(
      `${process.env.AUTH_BASEURL}/token`,
      qs.stringify({
        client_id: authConfig.auth.clientId,
        scope: authConfig.scopes.join(' '),
        code,
        redirect_uri: authConfig.redirectUri,
        grant_type: 'authorization_code',
        client_secret: authConfig.auth.clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    req.session.accessToken = response.data.access_token;
    console.log('Access token:', req.session.accessToken);
    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).send('Authentication failed');
  }
});

routes.get('/status', (req, res) => {
  if (req.session.accessToken) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

export default routes;
