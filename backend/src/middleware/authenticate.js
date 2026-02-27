import { tokenService } from '../services/tokenService.js';

export function authenticate(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      const err = new Error('Unauthorized');
      err.statusCode = 401;
      throw err;
    }

    req.user = tokenService.verify(token);
    next();
  } catch (_e) {
    const err = new Error('Unauthorized');
    err.statusCode = 401;
    next(err);
  }
}
