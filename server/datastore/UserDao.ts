import { User } from "../types/types";

// Data Accesses Object
export interface UserDao {
  createUser(user: User): void;
  getUserByEmail(email: string): User | undefined;
  getUserByUsername(userName: string): User | undefined;
}
