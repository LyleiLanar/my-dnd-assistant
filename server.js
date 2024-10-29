import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { get404 } from './controllers/errors.js';
import express from 'express';
import commonRoutes from './routes/common.js';
import session from 'express-session';
import authConfig from './config/authConfig.js';
import axios from 'axios';
import qs from 'qs';

const PORT = 666;
const app = express();
const authBaseUrl = 'https://login.microsoftonline.com/consumers/oauth2/v2.0';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'public')));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Bejelentkezési útvonal
app.get('/auth/login', (req, res) => {
  const { clientId } = authConfig.auth;
  const { redirectUri, scopes } = authConfig;

  const authUrl = `${authBaseUrl}/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
    ' '
  )}`;
  res.redirect(authUrl);
});

// Hitelesítési callback
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post(
      `${authBaseUrl}/token`,
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
    res.redirect('/onenote/notes');
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).send('Authentication failed');
  }
});

// Jegyzetek lekérdezése a OneNote API segítségével
app.get('/onenote/notes', async (req, res) => {
  try {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me/onenote/notebooks',
      {
        headers: { Authorization: `Bearer ${req.session.accessToken}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Could not fetch notes');
  }
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(commonRoutes);
app.use(get404);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
