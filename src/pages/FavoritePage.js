import styles from "./FavoritePage.module.scss";
import Pagination from "../components/ui/Pagination";
import CardGroup from "../components/ui/CardGroup";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import axios from "../lib/axios";

function FavoritePage() {
  const [values, setValues] = useState({
    title: "",
    url: "",
  });
  async function getFavorite() {
    const res = await axios.get(`/favorites`);
    console.log(res);
    const { title, url } = res.data.list;
    setValues({ title, url });
  }
  useEffect(() => {
    getFavorite();
  }, []);

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
