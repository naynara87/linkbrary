import { useLocation } from "react-router-dom";
import style from "./CardGroup.module.scss";
import Card from "./Card";
import CardEditBar from "./CardEditBar";

function CardListNone() {
  return (
    <div class="searchNone">
      <p>저장된 링크가 없습니다</p>
    </div>
  );
}

function CardGroup() {
  const location = useLocation();
  const isFavoritePage = location.pathname === "/favorite";

  return (
    <div className={style.cardGroup}>
      {!isFavoritePage && <CardEditBar />}
      <div className={style.cardList}>
        <Card />
      </div>
    </div>
  );
}

export default CardGroup;
