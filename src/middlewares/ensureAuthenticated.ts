import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing token.');
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: userId } = verify(token, 'cfe275a5908b5650488e0b0342c2d6cc') as JwtPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new Error('User does not exist.');
    }

    next();
  } catch (error) {
    throw new Error('Invalid token.');
  }
}
