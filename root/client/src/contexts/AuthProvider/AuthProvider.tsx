import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  userAuth: boolean;
  authenticateUser: (loggedIn: boolean) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContext = createContext<AuthContextType>({
  userAuth: false,
  authenticateUser: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userAuth, setUserAuth] = useState(false);

  const authenticateUser = (loggedIn: boolean) => {
    setUserAuth(loggedIn);
  };

  return (
    <AuthContext.Provider value={{ userAuth, authenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
