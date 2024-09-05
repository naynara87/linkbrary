import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import Icon from "../../components/ui/Icon";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrap}>
        <p className={styles.copyright}>©codeit - 2024</p>
        <div className={styles.sitemap}>
          <Link to="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
          <Link to="/faq" className={styles.link}>
            FAQ
          </Link>
        </div>
        <div className={styles.sns}>
          <ul className={styles.snsList}>
            <li>
              <Link to="https://www.facebook.com" title="페이스북 바로가기">
                <Icon type="facebook" size="sm" />
              </Link>
            </li>
            <li>
              <Link to="https://x.com" title="트위터 바로가기">
                <Icon type="twitter" size="sm" />
              </Link>
            </li>
            <li>
              <Link to="https://www.youtube.com" title="유튜브 바로가기">
                <Icon type="youtube" size="sm" />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com" title="인스타그램 바로가기">
                <Icon type="instagram" size="sm" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
