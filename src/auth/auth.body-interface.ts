import { Request } from 'express';
import { User } from '../user/user.entity';

export interface ReqBody {
  email: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user?: Omit<User, 'password'>;
}
