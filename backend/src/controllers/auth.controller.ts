import { User } from '../modals/auth.modal';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../types/user.types';
const JWT_SECRET = process.env.JWT_SECRET as string;

export function registerUser(req: Request<{}, {}, IUser>, res: Response): void {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }
  // check if user already exists
  User.findOne({ $or: [{ email }, { username }] })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).json({ message: 'Email already used!' });
        return;
      }

      // hash password
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({ username, email, password: hash })
            .then((user) => {
              const payload = { id: user._id, username, email };
              const token = jwt.sign(payload, JWT_SECRET);
              res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                  id: user._id,
                  username: user.username,
                  email: user.email,
                },
              });
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

          const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
          };
          const token = jwt.sign(payload, JWT_SECRET);
          res.status(200).json({
            message: 'User login successfully',
            token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
            },
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

// export function logoutUser(_req: Request, res: Response): void {
//   // fixed: call the function
//   res.clearCookie('token', { httpOnly: true });
//   res.status(200).json({ message: 'Logged out successfully' });
// }
