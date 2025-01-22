import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

interface TokenOptions {
  payload: { [key: string]: any };
  expiresIn?: string;
}

export const generateToken = ({ payload, expiresIn = '1h' }: TokenOptions): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
