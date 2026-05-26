import { createHash } from 'node:crypto';
import { LessThan, Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source.js';
import { RevokedToken } from './revoked-token.entity.js';

export class RevokedTokenService {
  private get repository(): Repository<RevokedToken> {
    return AppDataSource.getRepository(RevokedToken);
  }

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  public async isRevoked(token: string, tokenId?: string) {
    const tokenHash = this.hashToken(token);
    const qb = this.repository.createQueryBuilder('revoked');
    qb.where('revoked.tokenHash = :tokenHash', { tokenHash });
    if (tokenId) {
      qb.orWhere('revoked.tokenId = :tokenId', { tokenId });
    }
    return qb.getExists();
  }

  public async revoke(token: string, expiresAt: Date, tokenId?: string) {
    const entity = this.repository.create({
      tokenId,
      tokenHash: this.hashToken(token),
      expiresAt
    });
    return this.repository.save(entity);
  }

  public async purgeExpired(now: Date = new Date()) {
    await this.repository.delete({ expiresAt: LessThan(now) });
  }
}
