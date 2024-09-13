import { useLocation } from "react-router-dom";
import style from "./CardGroup.module.scss";
import Card from "./Card";
import FolderEditBar from "./FolderEditBar";
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "../../../lib/axios";

function CardGroup({ folderId }) {
  const location = useLocation();
  const isFavoritePage = useMemo(
    () => location.pathname === "/favorite",
    [location.pathname]
  );
  const [folders, setFolders] = useState([]);

  const fetchFolders = useCallback(async () => {
    if (!folderId) return;

    try {
      const res = await axios.get(`/folders/${folderId}/links`);
      if (Array.isArray(res.data.list)) {
        setFolders(res.data.list);
      } else {
        console.error("Unexpected response data format:", res.data.list);
        setFolders([]);
      }
    } catch (error) {
      console.error("카드 목록 조회 중 오류 발생:", error);
    }
  }, [folderId]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  return (
    <div className={style.cardGroup}>
      {!isFavoritePage && folderId && <FolderEditBar folderId={folderId} />}
      <div className={style.cardList}>
        {folders.length > 0 ? (
          folders.map((folder) => <Card key={folder.id} {...folder} />)
        ) : (
          <p className={style.noCards}>링크가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default CardGroup;
