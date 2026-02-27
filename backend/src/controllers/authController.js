import { registerUser } from '../usecases/auth/registerUser.js';
import { loginUser } from '../usecases/auth/loginUser.js';
import { userRepository } from '../repositories/userRepository.js';
import { hashService } from '../services/hashService.js';
import { tokenService } from '../services/tokenService.js';

const deps = { userRepository, hashService, tokenService };

export async function register(req, res, next) {
  try {
    const result = await registerUser(req.body, deps);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginUser(req.body, deps);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}
