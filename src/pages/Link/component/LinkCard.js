import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import style from "./LinkCard.module.scss";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import defaultImg from "../../../styles/images/links/default.png";
import Dropdown from "./Dropdown";
import timeAgo from "../../../lib/util/timeAgo";
import formatDate from "../../../lib/util/formatDate";
import axios from "../../../lib/axios";
import { useToaster } from "../../../contexts/ToasterProvider";

function LinkCard({
  id,
  favorite,
  url,
  title,
  imageSource,
  description,
  createdAt,
  fetchLinks,
}) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const location = useLocation();
  const toast = useToaster();

  const isFavoritePage = useMemo(
    () => location.pathname === "/favorite",
    [location.pathname]
  );

  const imageSrc = imageSource || defaultImg;

  const dropdownRef = useRef(null);

  const handleFavoriteToggle = useCallback(async () => {
    try {
      const newFavoriteStatus = !isFavorite;
      await axios.put(`/links/${id}/favorite`, { favorite: newFavoriteStatus });
      setIsFavorite(newFavoriteStatus);
      if (!isFavorite) {
        toast("info", "즐겨찾기가 추가되었습니다.");
      } else {
        toast("warn", "즐겨찾기가 삭제되었습니다.");
      }
    } catch (error) {
      console.error("즐겨찾기 상태 업데이트 중 오류 발생:", error);
    }
  }, [id, isFavorite, toast]);

  const imgError = useCallback((e) => {
    e.target.src = defaultImg;
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div className={style.card} id={id}>
      <Link to={url} title={title}>
        <div className={style.cardImg}>
          <img src={imageSrc} alt={title} onError={imgError} />
        </div>
      </Link>
      <div className={style.cardInfo}>
        <div className={style.cardInfoWrap}>
          <span className={style.time}>{timeAgo(createdAt)}</span>
          {!isFavoritePage && (
            <div className={style.cardEditGroup} ref={dropdownRef}>
              <Button type="button" onClick={toggleDropdown}>
                <Icon type="more" />
              </Button>
              {isDropdownVisible && (
                <Dropdown linkId={id} linkUrl={url} fetchLinks={fetchLinks} />
              )}
            </div>
          )}
        </div>
        <p className={style.infoText}>{description}</p>
        <span className={style.date}>{formatDate(createdAt)}</span>
      </div>
      <Button
        className={style.favoriteButton}
        aria-label="즐겨찾기 버튼"
        onClick={handleFavoriteToggle}
      >
        <Icon type={isFavorite ? "star_filled" : "star"} size="md" />
      </Button>
    </div>
  );
}

export default LinkCard;
