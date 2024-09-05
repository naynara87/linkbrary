import styles from "./SignupPage.module.scss";
import { Link } from "react-router-dom";
import logo from "../styles/images/logo/logo.svg";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";

function SignupPage() {
  return (
    <form className={styles.mainForm}>
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
      <div className={styles.inputGroup}>
        <label>이메일</label>
        <input
          className={styles.inputText}
          type="text"
          placeholder="이메일을 작성해주세요."
        />
      </div>
      <div className={styles.inputGroup}>
        <label>비밀번호</label>
        <input
          className={styles.inputText}
          type="password"
          placeholder="비밀번호를 작성해주세요."
        />
        <button type="button" className={styles.iconButton}>
          <Icon type="visible_off" size="sm" />
        </button>
      </div>
      <div className={styles.inputGroup}>
        <label>비밀번호 확인</label>
        <input
          className={styles.inputText}
          type="password"
          placeholder="비밀번호를 작성해주세요."
        />
        <button type="button" className={styles.iconButton}>
          <Icon type="visible_off" size="sm" />
        </button>
      </div>
      <Button type="submit" size="Lg" color="Primary">
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
