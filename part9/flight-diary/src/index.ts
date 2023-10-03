import express from 'express';
import { PORT } from '../config/config';
import diariesRouter from './routes/diaries';

const app = express();

app.use(express.json());

app.use('/api/diaries', diariesRouter);

app.get('/ping', (_request, response) => {
  console.log('Someone pinged here');
  response.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
