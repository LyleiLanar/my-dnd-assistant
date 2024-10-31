import { Router } from 'express';
import axios from 'axios';

const routes = Router();

// Jegyzetek lekérdezése a OneNote API segítségével
routes.get('/notebooks', async (req, res) => {
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

export default routes;
