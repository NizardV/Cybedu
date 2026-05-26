import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { RevokedTokenService } from '../modules/auth/revoked-token.service.js';
const revokedTokenService = new RevokedTokenService();
export const authenticate = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
        return;
    }
    const token = header.substring(7);
    try {
        const decoded = jwt.verify(token, env.auth.jwtSecret);
        if (typeof decoded !== 'object' || decoded === null || typeof decoded.sub !== 'number') {
            res.status(401).json({ message: 'Invalid token payload' });
            return;
        }
        const payload = decoded;
        if (await revokedTokenService.isRevoked(token, payload.jti)) {
            res.status(401).json({ message: 'Token has been revoked' });
            return;
        }
        req.user = {
            id: payload.sub,
            email: payload.email ?? '',
            roles: payload.roles?.map((role) => ({ name: role?.name ?? '' })) ?? []
        };
        req.token = token;
        req.tokenPayload = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
