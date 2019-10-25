import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';

@Service()
export default class UserService {
  constructor(@Inject('userModel') private userModel: Models.UserModel) {}

  public async GetUsers(): Promise<IUser[]> {
    try {
      return this.userModel.find();
    } catch (e) {
      throw e;
    }
  }
}
