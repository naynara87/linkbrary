import styles from "./FavoritePage.module.scss";
import FavoriteGroup from "./component/FavoriteGroup";

function FavoritePage() {
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
