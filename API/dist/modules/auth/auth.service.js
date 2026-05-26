import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';
import { UserService } from '../users/user.service.js';
export class AuthService {
    userService;
    constructor(userService = new UserService()) {
        this.userService = userService;
    }
    async validateUser(email, password) {
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
    generateToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.roles?.map((role) => ({ name: role?.name })) ?? []
        };
        const options = {
            expiresIn: env.auth.jwtExpiresIn,
            jwtid: randomUUID()
        };
        return jwt.sign(payload, env.auth.jwtSecret, options);
    }
}
