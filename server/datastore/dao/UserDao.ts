import { User } from '../../types/types';

// Data Accesses Object
export interface UserDao {
  createUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(userName: string): Promise<User | undefined>;
}
