import styles from "./LinkPage.module.scss";
import Button from "../../components/ui/Button";
import axios from "../../lib/axios";
import { useAuth } from "../../contexts/AuthProvider";
import { useState, useEffect, useCallback } from "react";
import LinkGroup from "./component/LinkGroup";
import Pagination from "../../components/ui/Pagination";
import FolderList from "./component/FolderList";
import FolderEditBar from "./component/FolderEditBar";
import Card from "../../components/ui/Card";

function LinkListNone() {
  return (
    <div className={styles.searchNone}>
      <p>저장된 링크가 없습니다</p>
    </div>
  );
}

function LinkPage() {
  // const { user } = useAuth();
  const [values, setValues] = useState({
    folderId: null,
    url: "",
  });
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);

  const handleFolderSelect = useCallback((folderId) => {
    setValues((prevValues) => ({ ...prevValues, folderId }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { folderId, url } = values;
      if (!folderId) {
        alert("폴더를 선택해 주세요.");
        return;
      }
      try {
        await axios.post(`/links`, { folderId, url });
        setValues({ folderId: folderId, url: "" });
        alert("링크가 성공적으로 추가되었습니다.");
      } catch (error) {
        console.error("링크 추가 중 오류 발생:", error);
        alert("링크 추가 중 오류가 발생했습니다.");
      }
    },
    [values]
  );

  const getFolders = useCallback(async () => {
    try {
      const url = values.folderId ? `/folders/${values.folderId}` : `/folders`;
      const res = await axios.get(url);
      setFolders(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("폴더 조회 중 오류 발생:", error);
      alert("폴더 조회 중 오류가 발생했습니다.");
    }
  }, [values.folderId]);

  const getLinks = useCallback(async () => {
    try {
      const res = await axios.get(`/links?search=${searchTerm}`);
      setFilteredLinks(res.data.list || []);
    } catch (error) {
      console.error("링크 조회 중 오류 발생:", error);
      alert("링크 조회 중 오류가 발생했습니다.");
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      getLinks();
    } else {
      getFolders();
    }
  }, [searchTerm, getLinks, getFolders]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, []);

  const hasSearchTerm = searchTerm.length > 0;
  const noResults = filteredLinks.length === 0 && hasSearchTerm;

  return (
    <>
      <section className={styles.linkHeader}>
        <form className={styles.linkInputGroup} onSubmit={handleSubmit}>
          <input
            className={styles.inputText}
            type="text"
            placeholder="링크를 추가해 보세요"
            value={values.url}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, url: e.target.value }))
            }
          />
          <Button
            type="submit"
            size="sm"
            color="Primary"
            aria-label="링크 추가 버튼"
          >
            추가하기
          </Button>
        </form>
      </section>
      <section className={styles.linkContents}>
        <div className={styles.linkSearchGroup}>
          <input
            className={styles.linkSearch}
            placeholder="링크를 검색해 보세요."
            onChange={handleSearchChange}
          />
        </div>
        {hasSearchTerm ? (
          <>
            <h5 className={styles.searchTerm}>
              <em>{searchTerm}</em>으로 검색한 결과입니다.
            </h5>
            {noResults ? (
              <LinkListNone />
            ) : (
              <>
                <FolderEditBar />
                <div className={styles.cardGroup}>
                  <div className={styles.cardList}>
                    {filteredLinks.map((link) => (
                      <Card key={link.id} {...link} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <FolderList onFolderSelect={handleFolderSelect} />
            {folders.length === 0 ? (
              <LinkListNone />
            ) : (
              folders.map((folder) => (
                <LinkGroup key={folder.id} folderId={folder.id} />
              ))
            )}
          </>
        )}
        <Pagination />
      </section>
    </>
  );
}

export default LinkPage;
