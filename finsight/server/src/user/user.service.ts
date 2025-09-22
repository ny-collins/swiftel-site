import { db } from '../utils/db.server';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

type User = { id: string; email: string; firstName: string | null; lastName: string | null; };

export const createUser = async (user: Omit<User, 'id'>, password_pure: string): Promise<Omit<User, 'password'>> => {
  console.log('--- SERVICE: Starting createUser ---'); // <-- CHECKPOINT 3
  const { email, firstName, lastName } = user;
  
  console.log('--- SERVICE: Hashing password ---'); // <-- CHECKPOINT 4
  const hashedPassword = await hash(password_pure, 10);
  
  console.log('--- SERVICE: Creating user in DB ---'); // <-- CHECKPOINT 5
  const newUser = await db.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });

  return newUser;
};

export const loginUser = async (email: string, password_pure: string): Promise<string | null> => {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isMatch = await compare(password_pure, user.password);

  if (!isMatch) {
    return null;
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'your-default-secret',
    { expiresIn: '1d' }
  );

  return token;
};
