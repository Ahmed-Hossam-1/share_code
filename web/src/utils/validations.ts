import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(1, { message: 'User Name is required' }),
  first_name: z.string().min(1, { message: 'First Name is required' }),
  last_name: z.string().min(1, { message: 'last Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Not Vaild Email' }),
  password: z.string().min(6, { message: 'password mast be at least 6 char' }),
});

export const signinSchema = z.object({
  login: z.string().min(1, { message: 'user name is required' }),

  password: z.string().min(6, { message: 'password mast be at least 6 char' }),
});

export const newPostSchema = z.object({
  url: z.string().min(1).url({ message: 'url is required' }),
  title: z.string().min(6, { message: 'title is required' }),
});
