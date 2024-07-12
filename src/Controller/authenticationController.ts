import User, { comparePassword, UserAuth } from "../model/User";
import { Request, Response } from 'express'
import JWT, { VerifyOptions } from 'jsonwebtoken';


export class AuthenticationController {
  /**
   * Handles post requests on /auth. Checks that the given credentials are valid
   * @param {http.IncomingMessage} request 
   * @param {http.ServerResponse} response 
   */
  static async checkCredentials(req: Request, res: Response) {
    let user: UserAuth = {
      username: req.body.username,
      password: req.body.password
    }
      const userFound: UserAuth = await User.findOne({ username: user.username });

      if (!userFound) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const isPasswordValid = await comparePassword(user.password, userFound.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      return userFound !== null;
  }

  static async saveUser(req: Request, res: Response) {
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    return user.save();
  }

  static issueToken(username: string) {
    return JWT.sign(
      { user: username }, 
      process.env.TOKEN_SECRET as string, 
      { expiresIn: '24h' }
    );
  }

  static isTokenValid(token: string, callback: VerifyOptions) {
    JWT.verify(token, process.env.TOKEN_SECRET, callback);
  }

  static async getUser(){
    return User.find();
  }
}