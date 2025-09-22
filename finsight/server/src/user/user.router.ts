import express from 'express';
import { body, validationResult } from 'express-validator';
import * as UserService from './user.service';

export const userRouter = express.Router();

userRouter.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').isString().notEmpty(),
  ],
  async (req, res) => {
    console.log('--- REGISTER: Request received ---'); // <-- CHECKPOINT 1
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password, firstName, lastName } = req.body;
      console.log('--- REGISTER: Calling createUser service ---'); // <-- CHECKPOINT 2
      const user = await UserService.createUser({ email, firstName, lastName }, password);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

userRouter.post('/login', [body('email').isEmail(), body('password').isString()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const token = await UserService.loginUser(email, password);

    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
