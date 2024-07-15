import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';


//TODO perché qui non funziona?
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'User unauthenticated' });
  }

  try {
    const secretKey = process.env.TOKEN_SECRET;
    const decodedToken = JWT.verify(token, secretKey) as { user: string, iat: number, exp: number };
    req.body.user = decodedToken.user;
    next();
  } catch (error) {
    console.log(error)
    res.status(403).json({ message: 'Invalid Token' });
  }
};