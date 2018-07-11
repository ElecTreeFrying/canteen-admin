import { User } from '../interface/interface';

export class UserModel {
  constructor(
    public uid: string,
    public timestamp: number,
    public user: User
  ) {}
}
