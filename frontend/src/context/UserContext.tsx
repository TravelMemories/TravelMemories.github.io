import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { UserData } from "../model/UserData";
import { CookiesProvider, useCookies } from "react-cookie";
import { IoMdReturnLeft } from "react-icons/io";
import { useTravelsContext } from "./TravelsContext";

interface UserContextProviderProps {
  children: ReactNode;
}
interface UserContextProps {
  isLoggedIn: boolean;
  LogIn: (userLoginData: UserData) => void;
  LogOut: () => void;
  GetUserData: () => UserData | undefined;
  userData: UserData | undefined;
  LoginCookies: () => void;
  DeleteAccount: () => void;
}
const UserContext = createContext({} as UserContextProps);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(["user"]);
  const { LoadUserTravels } = useTravelsContext();

  const LogIn = (userLoginData: UserData) => {
    setUserData(userLoginData);
    setIsLoggedIn(true);
    setUserCookie("user", userLoginData, { path: "/" });
    LoadUserTravels(userLoginData);
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
  const DeleteAccount = () => {
    if (!userData) {
      return;
    }
    //call api and delete all of content
    setUserData(undefined);
    LogOut();
  };
  const GetUserData = () => {
    return userData;
  };
  return (
    <CookiesProvider>
      <UserContext.Provider
        value={{
          isLoggedIn,
          LogIn,
          LogOut,
          userData,
          GetUserData,
          LoginCookies,
          DeleteAccount,
        }}
      >
        {children}
      </UserContext.Provider>
    </CookiesProvider>
  );
}
