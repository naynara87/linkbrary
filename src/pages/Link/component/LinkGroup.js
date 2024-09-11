import { useState, useEffect } from "react";
import style from "./LinkGroup.module.scss";
import Card from "../../../components/ui/Card";
import FolderEditBar from "./FolderEditBar";
import axios from "../../../lib/axios";

function LinkGroup({ folderId }) {
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
      <FolderEditBar folderId={folderId} />
      <div className={style.cardList}>
        {folders.map((folder) => (
          <Card key={folder.id} {...folder} />
        ))}
      </div>
    </div>
  );
}

export default LinkGroup;
