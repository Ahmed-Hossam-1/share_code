/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../utils/validations';
import { useSignupUser } from '../services/mutations';

const Signup = () => {
  type ISignUp = z.infer<typeof signupSchema>;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ISignUp>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending, data: user } = useSignupUser();
  console.log(user);

  const onSubmit: SubmitHandler<ISignUp> = (values: ISignUp) => {
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
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" placeholder="Enter Email" {...register('email')} />
        <span style={{ color: 'red' }}>{errors.email && errors.email.message}</span>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="first_name">First name</FormLabel>
        <Input id="first_name" placeholder="Enter First Name" {...register('first_name')} />
        <span style={{ color: 'red' }}>{errors.first_name && errors.first_name.message}</span>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="last_name">Last name</FormLabel>
        <Input id="last_name" placeholder="Enter Last Name" {...register('last_name')} />
        <span style={{ color: 'red' }}>{errors.last_name && errors.last_name.message}</span>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="username">User Name</FormLabel>
        <Input id="username" placeholder="Enter User Name" {...register('username')} />
        <span style={{ color: 'red' }}>{errors.username && errors.username.message}</span>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" placeholder="Enter Password" {...register('password')} />
        <span style={{ color: 'red' }}>{errors.password && errors.password.message}</span>
      </FormControl>
      <Button mt={4} variant="solid" isLoading={isSubmitting} type="submit">
        {isPending ? 'Loading' : 'Submit'}
      </Button>
    </form>
  );
};

export default Signup;
