import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import classNames from "classnames";
import styles from "./LoginPage.module.scss";
import logo from "../styles/images/logo/logo.svg";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { user, login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(e) {
    const { email, password } = values;
    await login({ email, password });
  }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formWrap}>
        <h1 className={styles.logo_lg}>
          <Link to="/" aria-label="logo">
            <img src={logo} alt="logo" />
          </Link>
        </h1>
        <p>
          회원이 아니신가요?&nbsp;
          <Link className={styles.underline} to="/signup">
            회원 가입하기
          </Link>
        </p>
      </div>
      <div
        className={classNames(styles.inputGroup, {
          [styles.is_valid_error]: errors.email,
        })}
      >
        <label>이메일</label>
        <input
          className={styles.inputText}
          type="text"
          placeholder="이메일을 작성해주세요."
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
        />
        {errors.email && (
          <p className={styles.is_valid_errorText}>{errors.email.message}</p>
        )}
      </div>
      <div
        className={classNames(styles.inputGroup, {
          [styles.is_valid_error]: errors.password,
        })}
      >
        <label>비밀번호</label>
        <div className={styles.inputGroup}>
          <input
            className={styles.inputText}
            type={passwordVisible ? "text" : "password"}
            placeholder="비밀번호를 작성해주세요."
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "8자 이상 작성해 주세요.",
              },
            })}
          />
          <button
            type="button"
            className={styles.iconButton}
            onClick={togglePasswordVisibility}
          >
            <Icon
              type={passwordVisible ? "visible_on" : "visible_off"}
              size="sm"
            />
          </button>
        </div>
        {errors.password && (
          <p className={styles.is_valid_errorText}>{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" size="lg" color="Primary">
        로그인
      </Button>
      <div className={styles.snsWrap}>
        소셜로그인
        <div className={styles.buttonGroup}>
          <Button type="button" className="buttonCircle">
            <Icon type="google" size="lg" className="icon_full" />
          </Button>
          <Button type="button" className="buttonCircle">
            <Icon type="kakao" size="lg" className="icon_full" />
          </Button>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
