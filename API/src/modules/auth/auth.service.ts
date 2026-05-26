import jwt from 'jsonwebtoken';
import type { SignOptions, Secret } from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';
import { UserService } from '../users/user.service.js';
import type { User } from '../users/user.entity.js';

type TokenPayload = {
  sub: number;
  email?: string;
  roles: Array<{ name?: string }>;
};

export class AuthService {
  constructor(private readonly userService = new UserService()) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user?.password) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return null;
    }

    return user;
  }

  public generateToken(user: User) {
    const payload: TokenPayload = {
      sub: user.id!,
      email: user.email,
      roles: user.roles?.map((role) => ({ name: role?.name })) ?? []
    };

    const options: SignOptions = {
      expiresIn: env.auth.jwtExpiresIn as SignOptions['expiresIn'],
      jwtid: randomUUID()
    };

    return jwt.sign(payload, env.auth.jwtSecret as Secret, options);
  }
}
