/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../utils/validations';
import { useSignupUser } from '../services/mutations';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCurrentUser } from '../context/CurrentUser';
import toast from 'react-hot-toast';

const Signup = () => {
  const [avatar, setAvatar] = useState();

  const handleAvatarChange = (event: any) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

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
  const { refetchCurrentUser } = useCurrentUser();
  const { mutate, isPending, data: user, error } = useSignupUser();
  console.log(error);
  const nav = useNavigate();
  const onSubmit: SubmitHandler<ISignUp> = (values: ISignUp) => {
    console.log(avatar, 'immmmmmmmm');
    console.log(values, 'Ffffffffffffffffff');
    const formData = new FormData();
    avatar && formData.append('avatar', avatar);
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    mutate(formData);
  };

  useEffect(() => {
    if (user) {
      toast.success('Successfully signed up');
      refetchCurrentUser();
      reset();
      nav('/home');
    }
    error && toast.error(error.response.data.error);
  }, [nav, user, error]);

  const openImage = useRef<any>(null);

  return (
    <form
      style={{
        width: '500px',
        margin: '0 auto',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <FormLabel htmlFor="avatar">Profile Photo</FormLabel>
        <Input
          id="avatar"
          type="file"
          onChange={(event: any) => handleAvatarChange(event)}
          hidden
          ref={openImage}
        />
      </FormControl>

      <div
        onClick={() => openImage.current?.click()}
        style={{
          position: 'relative',
          border: '5px dashed gray',
          marginBottom: '15px',
          cursor: 'pointer',
          width: '150px',
          height: '150px',
          margin: '0 auto',
          borderRadius: '100%',
        }}
      >
        <img
          style={{
            filter: 'grayscale(1)',
            borderRadius: '100%',
            height: '120px',
            width: '120px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          src="/images/non-photo.png"
          alt="NON"
        />
        {avatar && (
          <img
            style={{
              borderRadius: '100%',
              height: '120px',
              width: '120px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: '99',
              transform: 'translate(-50%, -50%)',
            }}
            src={URL.createObjectURL(avatar)}
            alt="img"
          />
        )}
      </div>

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
