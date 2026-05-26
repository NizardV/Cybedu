import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      email: string;
      roles: Array<{ name: string }>;
    };
    token?: string;
    tokenPayload?: {
      sub: number;
      email?: string;
      roles?: Array<{ name?: string }>;
      jti?: string;
      exp?: number;
    };
  }
}
