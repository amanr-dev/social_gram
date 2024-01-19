import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const naviagte = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // CheckAuthUser function
  const checkAuthUser = async () => {
    setLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      console.log(currentAccount);

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // UserEffect hook
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]"
      // || cookieFallback === null ||
      // cookieFallback === undefined
    ) {
      naviagte("/sign-in");
    }
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    authenticated,
    setAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
