import { useState, useEffect } from "react";
import style from "./FavoriteGroup.module.scss";
import Card from "../../../components/ui/Card";
import axios from "../../../lib/axios";

function FavoriteGroup() {
  const [values, setValues] = useState([]);
  async function getFavorite() {
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
    }
  }
  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <div className={style.cardGroup}>
      <div className={style.cardList}>
        {values.length === 0 ? (
          <div className={style.searchNone}>
            <p>저장된 링크가 없습니다</p>
          </div>
        ) : (
          values.map((value) => <Card key={value.id} {...value} />)
        )}
      </div>
    </div>
  );
}

export default FavoriteGroup;
