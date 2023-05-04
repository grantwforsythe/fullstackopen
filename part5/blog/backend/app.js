import express from 'express';
import 'express-async-errors';

import cors from 'cors';
import cookieParser from 'cookie-parser';

import blogsRouter from './routes/blogs';
import usersRouter from './routes/user';
import loginRouter from './routes/login';

import userExtractor from './middleware/userExtractor';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/login', loginRouter);
app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

export default app;
