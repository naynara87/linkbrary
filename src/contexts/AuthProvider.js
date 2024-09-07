import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

const AuthContext = createContext({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    isPending: true,
  });

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser;
    try {
      const res = await axios.get("/users");
      nextUser = res.data;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }) {
    try {
      const res = await axios.post("/auth/sign-in", {
        email,
        password,
      });
      const token = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      await getMe();
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  }

  async function logout() {
    alert("로그아웃이 되었습니다.");
    localStorage.removeItem("accessToken");
    setValues({ user: null, isPending: false });
  }

  // useEffect(() => {
  //   getMe();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      navigate("/login");
    }
  }, [context.user, context.isPending, navigate, required]);

  return context;
}
