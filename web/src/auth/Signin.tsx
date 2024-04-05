/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSigninUser } from '../services/mutations';
import { signinSchema } from '../utils/validations';

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

  const { mutate, isPending, data } = useSigninUser();

  console.log(data?.user);

  const onSubmit: SubmitHandler<ISignIn> = (values: ISignIn) => {
    mutate(values);
    reset();
  };

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
        {isPending ? 'loading...' : 'Submit'}
      </Button>
    </form>
  );
};

export default Signin;
