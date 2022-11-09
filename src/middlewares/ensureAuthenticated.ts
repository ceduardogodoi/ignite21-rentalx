import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing.', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: userId } = verify(token, 'cfe275a5908b5650488e0b0342c2d6cc') as JwtPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User does not exist.', 401);
    }

    request.user = {
      id: userId
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token.', 401);
  }
}
