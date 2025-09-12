import mongoose from 'mongoose';

export default function connectDB(): void {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log('Database[MongoDB] Successfully Connnected');
    })
    .catch((err) => {
      console.log('Database[MongoDB] connection error : ', err);
    });
}
