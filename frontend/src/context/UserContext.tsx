import React, { ReactNode, createContext, useContext, useState } from "react";
import { UserData } from "../model/UserData";
import { CookiesProvider, useCookies } from "react-cookie";

interface UserContextProviderProps {
  children: ReactNode;
}
interface UserContextProps {
  isLoggedIn: boolean;
  LogIn: (userLoginData: UserData) => void;
  LogOut: () => void;
  userData: UserData | undefined;
  LoginCookies: () => void;
}
const UserContext = createContext({} as UserContextProps);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(["user"]);

  const LogIn = (userLoginData: UserData) => {
    setUserData(userLoginData);
    setIsLoggedIn(true);
    setUserCookie("user", userLoginData, { path: "/" });
  };
  const LogOut = () => {
    setIsLoggedIn(false);
    setUserData(undefined);
    removeUserCookie("user", { path: "/" });
  };
  const LoginCookies = () => {
    const storedUserData = userCookie["user"] as UserData;
    if (storedUserData) {
      LogIn(storedUserData);
    }
  };
  return (
    <CookiesProvider>
      <UserContext.Provider
        value={{ isLoggedIn, LogIn, LogOut, userData, LoginCookies }}
      >
        {children}
      </UserContext.Provider>
    </CookiesProvider>
  );
}
