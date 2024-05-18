import User, { comparePassword, UserInterface } from "../model/User";
import {Response} from 'express'
import JWT, { VerifyOptions } from 'jsonwebtoken';


export class AuthenticationController {
  /**
   * Handles post requests on /auth. Checks that the given credentials are valid
   * @param {http.IncomingMessage} request 
   * @param {http.ServerResponse} response 
   */
  static async checkCredentials(req: UserInterface, res: Response) {
    try {
      const { username, password } = req;
  
      const user = await User.findOne({ username: username });
  
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      res.status(200).json({ message: "User authenticated successfully" });
    } catch (error) {
      console.error("Error checking credentials:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  /**
   * Attempts to create a new User
   */
  static async saveUser(userData: UserInterface, res: Response){
    const user = new User(userData);
    
    try {
      await user.save();
    } catch(err) {
      console.error("An error occurred while trying to create the user: ", err);
  
    }
  
    return user;
  }

  static issueToken(username: string){
    return JWT.sign({user:username}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
  }

  static isTokenValid(token: string, callback: VerifyOptions){
    JWT.verify(token, process.env.TOKEN_SECRET, callback);
  }
}