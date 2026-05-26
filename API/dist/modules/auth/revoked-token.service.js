import { createHash } from 'node:crypto';
import { LessThan } from 'typeorm';
import { AppDataSource } from '../../database/data-source.js';
import { RevokedToken } from './revoked-token.entity.js';
export class RevokedTokenService {
    get repository() {
        return AppDataSource.getRepository(RevokedToken);
    }
    hashToken(token) {
        return createHash('sha256').update(token).digest('hex');
    }
    async isRevoked(token, tokenId) {
        const tokenHash = this.hashToken(token);
        const qb = this.repository.createQueryBuilder('revoked');
        qb.where('revoked.tokenHash = :tokenHash', { tokenHash });
        if (tokenId) {
            qb.orWhere('revoked.tokenId = :tokenId', { tokenId });
        }
        return qb.getExists();
    }
    async revoke(token, expiresAt, tokenId) {
        const entity = this.repository.create({
            tokenId,
            tokenHash: this.hashToken(token),
            expiresAt
        });
        return this.repository.save(entity);
    }
    async purgeExpired(now = new Date()) {
        await this.repository.delete({ expiresAt: LessThan(now) });
    }
}
