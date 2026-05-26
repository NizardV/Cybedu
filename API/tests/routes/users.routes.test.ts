import request from 'supertest';
import jwt from 'jsonwebtoken';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { createApp } from '../../src/app.js';
import { UserService } from '../../src/modules/users/user.service.js';

const buildAuthHeader = () => {
  const token = jwt.sign(
    {
      sub: 1,
      email: 'tester@example.com',
      roles: []
    },
    process.env.JWT_SECRET ?? 'change-me'
  );
  return `Bearer ${token}`;
};

describe('User routes', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('GET /users should return the list provided by the service', async () => {
    const mockUsers = [
      { id: 1, email: 'test@example.com', roles: [] }
    ];
    const spy = vi.spyOn(UserService.prototype, 'findAll').mockResolvedValue(mockUsers as never);

    const app = createApp();
    const response = await request(app)
      .get('/users')
      .set('Authorization', buildAuthHeader());

    expect(spy).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('POST /users should validate payload', async () => {
    const app = createApp();

    const response = await request(app).post('/users').send({ email: 'missing@pwd' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('POST /users should delegate to the service', async () => {
    const payload = { email: 'new@example.com', password: 'secret' };
    const createdUser = { id: 42, email: payload.email };
    const spy = vi.spyOn(UserService.prototype, 'create').mockResolvedValue(createdUser as never);

    const app = createApp();
    const response = await request(app).post('/users').send(payload);

    expect(spy).toHaveBeenCalledWith(payload);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdUser);
  });
});
