import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const SECRET_KEY: Secret = process.env.JWT_SECRET || 'default-secret';

export interface TokenPayload extends JwtPayload {
  id: string;
  username: string;
  role: string;
}

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
