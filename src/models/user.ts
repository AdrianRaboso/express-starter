import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      validate: {
        validator: (v: string) =>  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v),
      },
    },
    password: String,
  },
  {
    collection: 'users',
    timestamps: true
  }
);

export default {
  name: 'userModel',
  model: mongoose.model<IUser & mongoose.Document>('User', User)
};
