/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { getCurrentUser } from '../services/endPoint';
import { useQuery } from '@tanstack/react-query';
import { User } from '../types/types';

type UserContext = {
  userID?: string;
  jwt: string;
  currentUser: User | undefined;
};

type CurrentUserContextProviderProps = {
  children: ReactNode;
};

export const userContext = createContext({} as UserContext);

export const CurrentUserContextProvider = ({
  children,
}: CurrentUserContextProviderProps): JSX.Element => {
  const [userId, setUserId] = useState(Cookies.get('userId') || '');
  const [jwt, setJwt] = useState(Cookies.get('jwt') || '');

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(userId),
  });
  return (
    <userContext.Provider value={{ userID: userId, jwt, currentUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useCurrentUser = () => useContext(userContext);
