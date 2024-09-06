import { useLocation } from "react-router-dom";
import style from "./Card.module.scss";
import Button from "./Button";
import Icon from "./Icon";
import defaultImg from "../../styles/images/links/sample.png";
import Dropdown from "./Dropdown";

function Card() {
  const location = useLocation();
  const isFavoritePage = location.pathname === "/favorite";
  return (
    <div className={style.card}>
      <div className={style.cardImg}>
        <img src={defaultImg} alt="대표 이미지" />
        <Button className={style.button} ariaLabel="즐겨찾기 버튼">
          <Icon name="ic_star" size="md" />
        </Button>
      </div>
      <div className={style.cardInfo}>
        <div className={style.cardInfoWrap}>
          <span className={style.time}>10 minutes ago</span>
          {!isFavoritePage && (
            <div className={style.cardEditGroup}>
              <Button type="button">
                <Icon type="more" />
              </Button>
              <Dropdown />
            </div>
          )}
        </div>
        <p className={style.infoText}>
          Lorem ipsum dolor sit amet consectetur. Metus amet habitant nunc
          consequat.
        </p>
        <date>2023.3.15</date>
      </div>
    </div>
  );
}
export default Card;
