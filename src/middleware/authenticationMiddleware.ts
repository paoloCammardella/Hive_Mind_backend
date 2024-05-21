import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';


//TODO perché qui non funziona?
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'User unauthenticated' });
  }

  try {
    const decoded = JWT.verify(token, process.env.TOKEN_SECRET as string);
    req.body.username = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};