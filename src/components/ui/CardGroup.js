import { useLocation } from "react-router-dom";
import style from "./CardGroup.module.scss";
import Card from "./Card";
import FolderEditBar from "./FolderEditBar";
import { useState, useEffect } from "react";
import axios from "../../lib/axios";

function CardGroup({ folderId }) {
  const location = useLocation();
  const isFavoritePage = location.pathname === "/favorite";
  const [folders, setfolders] = useState([]);

  useEffect(() => {
    async function fetchfolders() {
      try {
        const res = await axios.get(`/folders/${folderId}/links`);
        if (Array.isArray(res.data.list)) {
          setfolders(res.data.list);
        } else {
          console.error("Unexpected response data format:", res.data.list);
          setfolders([]);
        }
      } catch (error) {
        console.error("카드 목록 조회 중 오류 발생:", error);
      }
    }
    if (folderId) {
      fetchfolders();
    }
  }, [folderId]);

  return (
    <div className={style.cardGroup}>
      {!isFavoritePage && <FolderEditBar folderId={folderId} />}
      <div className={style.cardList}>
        {folders.map((folder) => (
          <Card key={folder.id} {...folder} />
        ))}
      </div>
    </div>
  );
}

export default CardGroup;
