import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    req.user = verifyToken(token); 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
