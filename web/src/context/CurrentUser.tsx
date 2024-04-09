/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from 'react';
import { getCurrentUser, isLoggedIn } from '../services/endPoint';
import { useQuery } from '@tanstack/react-query';
import { User } from '../types/types';

type UserContext = {
  // jwt: string | null;
  currentUser: User | undefined;
  refetchCurrentUser: () => void;
};

type CurrentUserContextProviderProps = {
  children: ReactNode;
};

export const userContext = createContext({} as UserContext);

export const CurrentUserContextProvider = ({
  children,
}: CurrentUserContextProviderProps): JSX.Element => {
  // const user = Cookies.get('jwt');
  // const [jwt, _] = useState<string | null>(user ? user : null);

  const { data: currentUser, refetch: refetchCurrentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: isLoggedIn(),
  });
  return (
    <userContext.Provider value={{ currentUser, refetchCurrentUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useCurrentUser = () => useContext(userContext);
