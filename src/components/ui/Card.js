import { useCallback } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.scss";
import defaultImg from "../../styles/images/links/default.png";
import timeAgo from "../../lib/util/timeAgo";
import formatDate from "../../lib/util/formatDate";

function Card({ id, url, title, imageSource, description, createdAt }) {
  const imageSrc = imageSource || defaultImg;

  const imgError = useCallback((e) => {
    e.target.src = defaultImg;
  }, []);

  return (
    <div className={style.card} id={id}>
      <Link to={url} title={title}>
        <div className={style.cardImg}>
          <img src={imageSrc} alt={title} onError={imgError} />
        </div>
        <div className={style.cardInfo}>
          <div className={style.cardInfoWrap}>
            <span className={style.time}>{timeAgo(createdAt)}</span>
          </div>
          <p className={style.infoText}>{description}</p>
          <span className={style.date}>{formatDate(createdAt)}</span>
        </div>
      </Link>
    </div>
  );
}

export default Card;
