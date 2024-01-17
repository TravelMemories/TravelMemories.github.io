import React, { ReactNode, createContext, useContext, useState } from "react";
import { UserData } from "../model/UserData";

interface UserContextProviderProps {
  children: ReactNode;
}
interface UserContextProps {
  isLoggedIn: boolean;
  LogIn: () => void;
  LogOut: () => void;
  userData: UserData | undefined;
}
const UserContext = createContext({} as UserContextProps);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const LogIn = () => {
    setIsLoggedIn(true);
  };
  const LogOut = () => {
    setIsLoggedIn(false);
    setUserData(undefined);
  };
  return (
    <UserContext.Provider value={{ isLoggedIn, LogIn, LogOut, userData }}>
      {children}
    </UserContext.Provider>
  );
}
