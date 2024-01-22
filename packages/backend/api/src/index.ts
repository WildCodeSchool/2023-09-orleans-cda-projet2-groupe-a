import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import router from './router';

const COOKIE_SECRET = process.env.COOKIE_SECRET;
const app = express();

const HOST = process.env.BACKEND_HOST ?? 'localhost';
const PORT = process.env.BACKEND_PORT ?? 3000;
const FRONTEND_HOST = process.env.FRONTEND_HOST ?? 'localhost';
const FRONTEND_PORT = process.env.FRONTEND_PORT ?? 4444;

app.use(express.json());

// Authorize Frontend to do requests to backend part.
app.use(
  cors({
    origin: `http://${FRONTEND_HOST}:${FRONTEND_PORT}`,
    credentials: true,
  }),
);
app.use(cookieParser(COOKIE_SECRET));

app.use('/api', router);
app.use(express.static('uploads'));
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
