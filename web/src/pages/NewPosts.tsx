/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPostSchema } from '../utils/validations';
import { useNavigate } from 'react-router-dom';
import { useNewPost } from '../services/mutations';
import { useCurrentUser } from '../context/CurrentUser';
import { toast } from 'react-hot-toast';

const NewPosts = () => {
  type TNewPost = z.infer<typeof newPostSchema>;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TNewPost>({
    mode: 'onChange',
    resolver: zodResolver(newPostSchema),
  });

  const { mutate, data, error } = useNewPost();
  console.log(data, error);
  const { currentUser } = useCurrentUser();
  const nav = useNavigate();
  const onSubmit: SubmitHandler<TNewPost> = async (values: TNewPost) => {
    await mutate({
      ...values,
      userId: currentUser?.id || '',
    });
    if (data) {
      toast.success('Post created successfully');
      nav('/home');
      reset();
    }
    if (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <form
      style={{
        width: '500px',
        marginLeft: '80px',
        marginTop: '30px',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <FormLabel htmlFor="url">URL</FormLabel>
        <Input id="url" placeholder="Enter url" {...register('url')} />
        <span style={{ color: 'red' }}>{errors.url && errors.url.message}</span>
      </FormControl>
      <br />
      <FormControl>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" placeholder="Enter title" {...register('title')} />
        <span style={{ color: 'red' }}>{errors.title && errors.title.message}</span>
      </FormControl>
      <Button mt={4} variant="solid" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default NewPosts;
