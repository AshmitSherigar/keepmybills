import { User } from '../modals/auth.modal';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../types/user.types';
const JWT_SECRET = process.env.JWT_SECRET as string;

export function registerUser(req: Request<{}, {}, IUser>, res: Response): void {
  const { username, email, password } = req.body;

  // check if user already exists
  User.findOne({ $or: [{ email }, { username }] })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).json({ message: 'User already exists!' });
        return;
      }

      // hash password
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({ username, email, password: hash })
            .then((user) => {
              const payload = { id: user._id };
              const token = jwt.sign(payload, JWT_SECRET);
              res.cookie('token', token, { httpOnly: true });
              res
                .status(201)
                .json({ message: 'User registered successfully', user });
            })
            .catch((err) => {
              if (err.code === 11000) {
                res
                  .status(400)
                  .json({ message: 'Username or email already exists!' });
                return;
              }
              res.status(500).json({ error: `Server Error! : ${err}` });
            });
        })
        .catch((err) => {
          res.status(500).json({ error: `Server Error! : ${err}` });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: `Server Error! : ${err}` });
    });
}

export function loginUser(
  req: Request<{}, {}, Omit<IUser, 'username'>>,
  res: Response
): void {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            res.status(401).json({ message: 'Passwords dont match' });
            return;
          }

          const payload = { id: user._id };
          const token = jwt.sign(payload, JWT_SECRET);
          res.cookie('token', token, { httpOnly: true });
          res.status(200).json({ message: 'User login successfully', user });
        })
        .catch((err) => {
          res.status(500).json({ error: `Server Error! : ${err}` });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: `Server Error! : ${err}` });
    });
}

export function logoutUser(_req: Request, res: Response): void {
  // fixed: call the function
  res.clearCookie('token', { httpOnly: true });
  res.status(200).json({ message: 'Logged out successfully' });
}
