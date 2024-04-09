/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useSigninUser } from '../services/mutations';
import { signinSchema } from '../utils/validations';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../context/CurrentUser';
import { useEffect } from 'react';
import { isLoggedIn, signinUser } from '../services/endPoint';

const Signin = () => {
  type ISignIn = z.infer<typeof signinSchema>;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ISignIn>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
  });

  // const { mutate, isPending } = useSigninUser();
  const { refetchCurrentUser } = useCurrentUser();
  const nav = useNavigate();
  const onSubmit: SubmitHandler<ISignIn> = async (values: ISignIn) => {
    await signinUser(values);
    refetchCurrentUser();
    reset();
  };

  useEffect(() => {
    isLoggedIn() && nav('/');
  }, [nav, isLoggedIn, refetchCurrentUser]);

  return (
    <form
      style={{
        width: '500px',
        margin: '0 auto',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <FormLabel htmlFor="username">User Name / Email</FormLabel>
        <Input id="username" placeholder="Enter User Name" {...register('login')} />
        <span style={{ color: 'red' }}>{errors.login && errors.login.message}</span>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" placeholder="Enter Password" {...register('password')} />
        <span style={{ color: 'red' }}>{errors.password && errors.password.message}</span>
      </FormControl>
      <Button mt={4} variant="solid" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Signin;
