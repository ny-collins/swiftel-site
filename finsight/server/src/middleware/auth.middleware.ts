import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Add a custom property 'userId' to the Request object
export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret', (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.userId = user.userId;
    next();
  });
};
