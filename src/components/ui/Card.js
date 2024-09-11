import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import style from "./Card.module.scss";
import Button from "./Button";
import Icon from "./Icon";
import defaultImg from "../../styles/images/links/default.png";
import Dropdown from "./Dropdown";
import timeAgo from "../../lib/util/timeAgo";
import formatDate from "../../lib/util/formatDate";
import axios from "../../lib/axios";

function Card({
  id,
  favorite,
  url,
  title,
  imageSource,
  description,
  createdAt,
  onDelete,
}) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const location = useLocation();
  const isFavoritePage = location.pathname === "/favorite";
  const imageSrc = imageSource || defaultImg;

  // Ref to track the dropdown element
  const dropdownRef = useRef(null);

  const handleFavoriteToggle = async () => {
    try {
      const newFavoriteStatus = !isFavorite;
      await axios.put(`/links/${id}/favorite`, {
        favorite: newFavoriteStatus,
      });
      setIsFavorite(newFavoriteStatus);
    } catch (error) {
      console.error("즐겨찾기 상태 업데이트 중 오류 발생:", error);
    }
  };

  const imgError = (e) => {
    e.target.src = defaultImg;
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on unmount or when dropdown is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className={style.card} id={id}>
      <div className={style.cardImg}>
        <img src={imageSrc} alt={title} onError={imgError} />
        <Button
          className={style.button}
          aria-label="즐겨찾기 버튼"
          onClick={handleFavoriteToggle}
        >
          <Icon type={isFavorite ? "star_filled" : "star"} size="md" />
        </Button>
      </div>
      <div className={style.cardInfo}>
        <div className={style.cardInfoWrap}>
          <span className={style.time}>{timeAgo(createdAt)}</span>
          {!isFavoritePage && (
            <div className={style.cardEditGroup} ref={dropdownRef}>
              <Button type="button" onClick={toggleDropdown}>
                <Icon type="more" />
              </Button>
              {isDropdownVisible && (
                <Dropdown linkId={id} onDelete={onDelete} />
              )}
            </div>
          )}
        </div>
        <p className={style.infoText}>{description}</p>
        <span className={style.date}>{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}

export default Card;
