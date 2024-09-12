import styles from "./FavoritePage.module.scss";
import FavoriteGroup from "./component/FavoriteGroup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
function FavoritePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <section className={styles.linkHeader}>
        <h3>⭐️ 즐겨찾기</h3>
      </section>
      <section className={styles.linkContents}>
        <FavoriteGroup />
      </section>
    </>
  );
}
export default FavoritePage;
