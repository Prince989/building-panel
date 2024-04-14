import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types";
import httpClient from "../API";

interface IAuthHook {
  user: IUser | null,
  token: string,
  loginAction: (data: { phoneNumber: string, verificationCode: string, callback: () => void }) => void,
  logOut: () => void
}

const AuthContext = createContext<IAuthHook>({ user: null, token: "", loginAction: () => { }, logOut: () => { } });

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [callback, setCallback] = useState<any>()
  const navigate = useNavigate();

  const loginAction = async (data: { phoneNumber: string, verificationCode: string, callback: () => void }) => {
    httpClient.post("/api/login", {
      phoneNumber: data.phoneNumber,
      verificationCode: data.verificationCode
    }).then(res => {
      if (res.data) {
        localStorage.setItem("site", res.data.data.token);
        setToken(res.data.data.token);
        setCallback(data.callback)
      }
    })
  };

  useEffect(() => {
    if (token && callback) {
      httpClient.get("/api/user/profile").then(res => {
        setUser(res.data.data);
        if (callback)
          callback()
      })
    }
  }, [token, callback])

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/auth/login");
  };
  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};