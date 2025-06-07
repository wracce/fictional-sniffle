export const jwtConstants = {
  secret: process.env.JWT_TOKEN_SECRET || 'secret',
  expiresIn: process.env.JWT_TOKEN_EXPIRATION || '1d'
};
