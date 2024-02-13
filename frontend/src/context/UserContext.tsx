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
import api from "../api/api";

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
  CreateUser: (email: string, password: string) => Promise<boolean>;
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
    try {
      api.delete(`/user/delete?id=${userData.id}`);
      LogOut();
    } catch (err) {
      console.log(err);
    }
  };
  const GetUserData = () => {
    return userData;
  };
  const CreateUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await api.put(
        `/user/create?email=${email}&password=${password}`
      );
      LogIn({
        id: response.data.id,
        email: email,
        password: password,
      } as UserData);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
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
          CreateUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </CookiesProvider>
  );
}
