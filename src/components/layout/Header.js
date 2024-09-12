import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../styles/images/logo/logo.svg";
import Button from "../../components/ui/Button";
import myprofile from "../../styles/images/icon/icon_myprofile.svg";
import { useAuth } from "../../contexts/AuthProvider";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };
  const handleLogoClick = () => {
    if (user) {
      navigate("/link");
    } else {
      navigate("/");
    }
  };
  return (
    <header className={styles.fixed}>
      <div className={styles.headerContianer}>
        <h1 className={styles.logo}>
          <Link onClick={handleLogoClick}>
            <img src={logo} alt="logo" />
          </Link>
        </h1>
        {user ? (
          <div className={styles.userWrap}>
            <Button as={Link} to="/favorite" shape="Outline" size="md">
              ⭐️&nbsp;즐겨찾기
            </Button>
            <Button type="button" shape="Profile">
              <img src={myprofile} alt="프로필 이미지" />
              <p>{user.name}</p>
            </Button>
            <Button
              type="button"
              color="Primary"
              size="md"
              className="mlAuto"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <>
            <Button
              as={Link}
              to="/login"
              type="button"
              color="Primary"
              size="md"
              className="mlAuto"
            >
              로그인
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
