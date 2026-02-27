import bcrypt from 'bcryptjs';

export const hashService = {
  hash: (plain) => bcrypt.hash(plain, 10),
  compare: (plain, hashed) => bcrypt.compare(plain, hashed)
};
