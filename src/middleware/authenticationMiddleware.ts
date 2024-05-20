import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { UserInterface } from 'model/User';


//TODO perché qui non funziona?
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'User unauthenticated' });
  }

  try {
    const decoded = JWT.verify(token, process.env.TOKEN_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

//TODO valutare se è necessaria questa funzione, non ho ruoli in effetti
// export const checkPermissions = (requiredRole: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: 'Access Denied' });
//     }

//     if (user.role !== requiredRole) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     next();
//   };
// };
