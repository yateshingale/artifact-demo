import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const tokenService = {
  sign: (payload) => jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn }),
  verify: (token) => jwt.verify(token, env.jwtSecret)
};
