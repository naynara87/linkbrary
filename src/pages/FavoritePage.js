import styles from "./FavoritePage.module.scss";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Pagination from "../components/ui/Pagination";
import CardGroup from "../components/ui/CardGroup";
function FavoritePage() {
  return (
    <>
      <section className={styles.linkHeader}>
        <h3>⭐️ 즐겨찾기</h3>
      </section>
      <section className={styles.linkContents}>
        <CardGroup />
        <Pagination />
      </section>
    </>
  );
}
export default FavoritePage;
