import { AuthService } from './auth.service.js';
import { UserService } from '../users/user.service.js';
import { RevokedTokenService } from './revoked-token.service.js';
export class AuthController {
    authService;
    userService;
    revokedTokenService;
    constructor(authService = new AuthService(), userService = new UserService(), revokedTokenService = new RevokedTokenService()) {
        this.authService = authService;
        this.userService = userService;
        this.revokedTokenService = revokedTokenService;
    }
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: 'email and password are required' });
                return;
            }
            const user = await this.authService.validateUser(email, password);
            if (!user) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
            const token = this.authService.generateToken(user);
            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    roles: user.roles
                }
            });
        }
        catch (error) {
            next(error);
        }
    };
    register = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: 'email and password are required' });
                return;
            }
            const existing = await this.userService.findByEmail(email);
            if (existing) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }
            const user = await this.userService.create({ email, password });
            const token = this.authService.generateToken(user);
            res.status(201).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    roles: user.roles
                }
            });
        }
        catch (error) {
            next(error);
        }
    };
    logout = async (req, res, next) => {
        try {
            const payload = req.tokenPayload;
            if (req.token && payload?.exp) {
                const expiresAt = new Date(payload.exp * 1000);
                await this.revokedTokenService.revoke(req.token, expiresAt, payload?.jti);
            }
            await this.revokedTokenService.purgeExpired();
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    };
}
