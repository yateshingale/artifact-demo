export async function loginUser({ email, password }, deps) {
  const { userRepository, hashService, tokenService } = deps;
  const user = await userRepository.findByEmail(email);
  if (!user || !(await hashService.compare(password, user.passwordHash))) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const token = tokenService.sign({ sub: user.id, email: user.email });
  return { token, user: { id: user.id, email: user.email, name: user.name } };
}
