import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access token required' });
        return ;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return ;
    }

    req.user = decoded;
    next();
};
