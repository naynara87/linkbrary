import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import axios from "../lib/axios";
import classNames from "classnames";
import styles from "./SignupPage.module.scss";
import logo from "../styles/images/logo/logo.svg";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";

function SignupPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const navigate = useNavigate();
  const { user, login, checkEmailExists } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        alert("이미 사용 중인 이메일입니다.");
        return;
      }

      const res = await axios.post("/auth/sign-up", {
        name,
        email,
        password,
      });
      console.log(res);
      await login({ email, password });
      navigate("/link");
    } catch (error) {
      console.error("회원가입 중 에러 발생:", error);
      alert("회원가입에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/link");
    }
  }, [user, navigate]);

  const passwordValue = watch("password");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
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
          이미 회원이신가요?&nbsp;
          <Link className={styles.underline} to="/login">
            로그인 하기
          </Link>
        </p>
      </div>

      <div
        className={classNames(styles.inputGroup, {
          [styles.is_valid_error]: errors.name,
        })}
      >
        <label>이름</label>
        <input
          className={styles.inputText}
          type="text"
          placeholder="이름을 작성해주세요."
          {...register("name", {
            required: "이름을 입력해주세요.",
            onChange: handleChange,
          })}
        />
        {errors.name && (
          <p className={styles.is_valid_errorText}>{errors.name.message}</p>
        )}
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
            onChange: handleChange,
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
              onChange: handleChange,
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

      <div
        className={classNames(styles.inputGroup, {
          [styles.is_valid_error]: errors.passwordConfirm,
        })}
      >
        <label>비밀번호 확인</label>
        <div className={styles.inputGroup}>
          <input
            className={styles.inputText}
            type={passwordConfirmVisible ? "text" : "password"}
            placeholder="비밀번호를 확인해주세요."
            {...register("passwordConfirm", {
              required: "비밀번호가 일치하지 않습니다.",
              validate: (value) =>
                value === passwordValue || "비밀번호가 일치하지 않습니다.",
              onChange: handleChange,
            })}
          />
          <button
            type="button"
            className={styles.iconButton}
            onClick={togglePasswordConfirmVisibility}
          >
            <Icon
              type={passwordConfirmVisible ? "visible_on" : "visible_off"}
              size="sm"
            />
          </button>
        </div>
        {errors.passwordConfirm && (
          <p className={styles.is_valid_errorText}>
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" color="Primary">
        회원가입
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

export default SignupPage;
