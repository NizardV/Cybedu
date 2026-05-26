export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    db: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USER ?? 'wss',
        password: process.env.DB_PASSWORD ?? 'WSS',
        database: process.env.DB_NAME ?? 'wss_dev'
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET ?? 'change-me',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
        bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10)
    }
};
export const isProduction = env.nodeEnv === 'production';
