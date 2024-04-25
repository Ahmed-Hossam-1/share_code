import { useMutation } from '@tanstack/react-query';
import { createPosts, signinUser, signupUser } from './endPoint';
import { TNewPost, User } from '../types/types';
import { SignInRequest } from '../types/api';

export const useSignupUser = () => {
  return useMutation({
    mutationFn: (userData: User) => signupUser(userData),
    onMutate: () => {
      console.log('loading');
    },
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('success');
    },
  });
};

export const useSigninUser = () => {
  return useMutation({
    mutationFn: (userData: SignInRequest) => signinUser(userData),
    onMutate: () => {
      console.log('loading');
    },
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('success');
    },
  });
};

export const useNewPost = () => {
  return useMutation({
    mutationFn: (postData: TNewPost) => createPosts(postData),
    onMutate: () => {
      console.log('loading');
    },
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      console.log('success');
    },
  });
};
