import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import connectDB from './db/db';
import cookieParser from 'cookie-parser';
import { router as userRoute } from './routes/auth.route';

const app: express.Application = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
