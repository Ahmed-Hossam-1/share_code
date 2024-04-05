/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Signup = () => {
  const signupSchema = z.object({
    username: z.string().min(1, { message: 'User Name is required' }),
    first_name: z.string().min(1, { message: 'First Name is required' }),
    last_name: z.string().min(1, { message: 'last Name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Not Vaild Email' }),
    password: z.string().min(6, { message: 'password mast be at least 6 char' }),
  });
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

  const onSubmit: SubmitHandler<ISignUp> = (values: ISignUp) => {
    console.log(values);
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
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="first_name">First name</FormLabel>
        <Input id="first_name" placeholder="Enter First Name" {...register('first_name')} />
        <FormErrorMessage>{errors.first_name && errors.first_name.message}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="last_name">Last name</FormLabel>
        <Input id="last_name" placeholder="Enter Last Name" {...register('last_name')} />
        <FormErrorMessage>{errors.last_name && errors.last_name.message}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="username">User Name</FormLabel>
        <Input id="username" placeholder="Enter User Name" {...register('username')} />
        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" placeholder="Enter Password" {...register('password')} />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} variant="solid" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Signup;
