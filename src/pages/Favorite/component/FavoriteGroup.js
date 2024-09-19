import { useState, useEffect } from "react";
import style from "./FavoriteGroup.module.scss";
import Card from "../../../components/ui/Card";
import axios from "../../../lib/axios";
import Loader from "../../../components/ui/Loader";

function FavoriteGroup() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getFavorite() {
    setLoading(true);
    try {
      const res = await axios.get(`/favorites`);
      if (Array.isArray(res.data.list)) {
        setValues(res.data.list);
      } else {
        console.error("Unexpected response data format:", res.data.list);
        setValues([]);
      }
    } catch (error) {
      console.error("카드 목록 조회 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <div className={style.cardGroup}>
      {loading ? (
        <div className={style.searchNone}>
          <Loader />
        </div>
      ) : values.length === 0 ? (
        <div className={style.searchNone}>
          <p>저장된 링크가 없습니다.</p>
        </div>
      ) : (
        <div className={style.cardList}>
          {values.map((value) => (
            <Card key={value.id} {...value} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteGroup;
