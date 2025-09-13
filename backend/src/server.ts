import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './db/db';
import protectedRoutes from './routes/auth.protected'
// import cookieParser from 'cookie-parser';
import { router as userRoute } from './routes/auth.route';
import cors from 'cors';

const app: express.Application = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use('/api/auth/user', userRoute);
app.use("/api", protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
