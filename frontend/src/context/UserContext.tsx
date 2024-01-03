import React, { ReactNode, createContext, useContext, useState } from "react";

interface UserContextProviderProps {
  children: ReactNode;
}
interface UserContext {
  isLoggedIn: boolean;
}
const UserContext = createContext({} as UserContext);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
