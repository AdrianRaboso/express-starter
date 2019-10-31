import { Service, Inject } from 'typedi';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from 'config';
import { Error } from 'mongoose';

@Service()
export default class UserService {
  constructor(@Inject('userModel') private userModel: Models.UserModel) {}

  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);
      // Hashing password
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      // Creating user db record
      const userRecord = new this.userModel({
        ...userInputDTO,
        password: hashedPassword
      });
      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      // Generating JWT
      const token = this.generateToken(userRecord);
      // Save user
      const user = await userRecord.save();
      // Return user and token
      return { user, token };
    } catch (e) {
      throw e;
    }
  }

  public async SignIn(userInput: IUser): Promise<{ token: string }> {
    try {
      let token = '';
      // Get hashed user password
      const user: any = await this.userModel.findOne({email: userInput.email});
      // Verify user and pass
      if (user && await argon2.verify(user.password, userInput.password)) {
        // Password match
        token = this.generateToken(user);
      } else {
        // Password did not match
        throw new Error('Wrong credentials!');
      }
      // Return token
      return { token };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private generateToken(user: IUser) {
    // Sign JWT for userId, expires in 1h
    return jwt.sign(
      {
        name: user.name,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      },
      config.get('jwt.secretKey')
    );
  }
}
