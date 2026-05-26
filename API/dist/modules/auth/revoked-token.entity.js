var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
let RevokedToken = class RevokedToken {
    id;
    tokenId;
    tokenHash;
    expiresAt;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], RevokedToken.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], RevokedToken.prototype, "tokenId", void 0);
__decorate([
    Column({ type: 'varchar', length: 512, unique: true }),
    __metadata("design:type", String)
], RevokedToken.prototype, "tokenHash", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], RevokedToken.prototype, "expiresAt", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], RevokedToken.prototype, "createdAt", void 0);
RevokedToken = __decorate([
    Entity({ name: 'revoked_tokens' })
], RevokedToken);
export { RevokedToken };
