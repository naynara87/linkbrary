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
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      await axios.post("//users/check-email", { email });

      const token = res.data.accessToken; // 서버에서 받은 토큰을 가져옵니다.
      localStorage.setItem("accessToken", token); // 토큰을 localStorage에 저장합니다.
      // await getMe(); // 사용자 정보를 가져옵니다.
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  }

  async function logout() {
    try {
      // await axios.post("/auth/sign-out");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      localStorage.removeItem("accessToken");
      setValues({ user: null, isPending: false });
    }
  }

  async function checkEmailExists(email) {
    try {
      const response = await axios.post("/users/check-email", { email });
      return response.data; // 서버에서 이메일 존재 여부를 `exists`로 반환한다고 가정
    } catch (error) {
      console.error("이메일 중복 체크 실패:", error);
      return false;
    }
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
