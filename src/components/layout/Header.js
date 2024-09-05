import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../styles/images/logo/logo.svg";
import Button from "../../components/ui/Button";

function Header() {
  return (
    <header className={styles.fixed}>
      <div className={styles.headerContianer}>
        <h1 className={styles.logo}>
          <img src={logo} alt="logo" />
        </h1>
        <Button
          as={Link}
          to="/login"
          type="button"
          color="Primary"
          size="Md"
          className="mlAuto"
        >
          로그인
        </Button>
      </div>
    </header>
  );
}

export default Header;
