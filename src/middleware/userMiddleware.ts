import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { UserInterface } from 'model/User';

//TODO check whether user can like the post or not
export const checkLikePermission = (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (error) {

  }
};