import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { get404 } from './controllers/errors.js';
import express from 'express';
import commonRoutes from './routes/common.js';
import authRoutes from './routes/auth.js';
import oneNoteRoutes from './routes/oneNote.js';
import session from 'express-session';
import cors from 'cors';

const PORT = 666;
const app = express();

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

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/auth', authRoutes);
app.use('/onenote', oneNoteRoutes);
app.use(commonRoutes);
app.use(get404);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
