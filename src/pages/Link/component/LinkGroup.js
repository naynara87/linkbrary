import { useState, useEffect } from "react";
import style from "./LinkGroup.module.scss";
import LinkCard from "./LinkCard";
import FolderEditBar from "./FolderEditBar";
import axios from "../../../lib/axios";
import Loader from "../../../components/ui/Loader";

function LinkGroup({ folderId, updateLink, getFolders }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/folders/${folderId}/links`);
      if (Array.isArray(res.data.list)) {
        setLinks(res.data.list);
      } else {
        console.error("Unexpected response data format:", res.data.list);
        setLinks([]);
      }
    } catch (error) {
      console.error("링크 목록 조회 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [folderId, updateLink]);

  return (
    <div className={style.cardGroup}>
      <FolderEditBar folderId={folderId} getFolders={getFolders} />
      {loading ? (
        <div className={style.searchNone}>
          <Loader />
        </div>
      ) : links.length === 0 ? (
        <div className={style.searchNone}>
          <p>저장된 링크가 없습니다.</p>
        </div>
      ) : (
        <div className={style.cardList}>
          {links.map((link) => (
            <LinkCard key={link.id} {...link} fetchLinks={fetchLinks} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LinkGroup;
