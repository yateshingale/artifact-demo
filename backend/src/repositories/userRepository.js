import { User } from '../models/User.js';

export const userRepository = {
  findByEmail: (email) => User.findOne({ email }),
  create: (user) => User.create(user),
  findById: (id) => User.findById(id)
};
