import { model, Schema } from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const User = model<IUser>('User', userSchema);
