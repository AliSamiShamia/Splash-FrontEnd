// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";
import { useDispatch } from "react-redux";

// ** Config
import {
  AuthValuesType,
  ErrCallbackType,
  RegisterParams,
  UserDataType,
  UserType,
} from "@/types";
import { Routes } from "../constant";
import { post } from "@/handler/api.handler";
import { storeUser } from "@/store/apps/user";

// ** Types

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,

  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  const initAuth = async (): Promise<void> => {
    const storedToken = window.localStorage.getItem(
      Routes.storageTokenKeyName
    )!;
    if (storedToken) {
      setLoading(true);
      try {
        const res = await post(Routes.user.profile, {}, storedToken);
        if (res && res.status_code == 200) {
          setLoading(false);
          if (res.data) {
            setUser({ ...res.data });
            dispatch(storeUser({ ...res.data }));
            localStorage.setItem("userData", JSON.stringify(res.data));
            localStorage.setItem("token", res.data.token);
          }
        } else {
          localStorage.removeItem("userData");
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        }
      } catch (e: any) {
        setUser(null);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const handleRegister = async (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    try {
      const res = await post(Routes.user.store, params, null);
      if (res && res.status_code == 200) {
        setUser(res.data);
        dispatch(storeUser(res.data));
        localStorage.setItem("userData", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
      }
    } catch (e) {
      setUser(null);
    }
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,

    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
