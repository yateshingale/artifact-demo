// Use cases isolate business rules from transport details for clean architecture.
export async function registerUser({ email, password, name }, deps) {
  const { userRepository, hashService, tokenService } = deps;
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    const err = new Error('Email already in use');
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await hashService.hash(password);
  const user = await userRepository.create({ email, passwordHash, name });
  const token = tokenService.sign({ sub: user.id, email: user.email });

  return { token, user: { id: user.id, email: user.email, name: user.name } };
}
