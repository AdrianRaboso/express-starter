import { Service, Inject } from 'typedi';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from 'config';

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
      console.error(e);
      throw e;
    }
  }

  private generateToken(user: IUser) {
    // Sign JWT for userId, expires in 1h
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      },
      config.get('jwt.secretKey')
    );
  }
}
