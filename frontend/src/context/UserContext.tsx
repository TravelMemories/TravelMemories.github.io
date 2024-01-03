import React, { ReactNode, createContext, useContext, useState } from "react";

interface UserContextProviderProps {
  children: ReactNode;
}
interface UserContextProps {
  isLoggedIn: boolean;
  LogIn: () => void;
  LogOut: () => void;
}
const UserContext = createContext({} as UserContextProps);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const LogIn = () => {
    setIsLoggedIn(true);
  };
  const LogOut = () => {
    setIsLoggedIn(false);
  };
  return (
    <UserContext.Provider value={{ isLoggedIn, LogIn, LogOut }}>
      {children}
    </UserContext.Provider>
  );
}
