import cors from 'cors';
import express from 'express';

import router from './router';

const app = express();

const HOST = process.env.BACKEND_HOST ?? 'localhost';
const PORT = process.env.BACKEND_PORT ?? 3000;

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
