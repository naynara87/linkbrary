import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "./LinkPage.module.scss";
import Button from "../../components/ui/Button";
import axios from "../../lib/axios";
import LinkGroup from "./component/LinkGroup";
import FolderList from "./component/FolderList";
import FolderEditBar from "./component/FolderEditBar";
import Card from "../../components/ui/Card";
import debounce from "lodash.debounce";
import { useModal } from "../../contexts/ModalProvider";
import { useToaster } from "../../contexts/ToasterProvider";

function LinkListNone() {
  return (
    <div className={styles.searchNone}>
      <p>저장된 링크가 없습니다</p>
    </div>
  );
}

function LinkPage() {
  const { openModal, closeModal } = useModal();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [values, setValues] = useState({
    folderId: null,
    url: "",
  });
  const [folders, setFolders] = useState([]);
  const [modalFolders, setModalFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);
  const toast = useToaster();

  const handleFolderSelect = useCallback((folderId) => {
    setValues((prevValues) => ({ ...prevValues, folderId }));
  }, []);

  const onAddLinkSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { folderId, url } = values;
    try {
      await axios.post(`/links`, { folderId, url });
      setValues({ folderId: folderId, url: "" });
      toast("info", "링크가 성공적으로 추가되었습니다.");
      closeModal();
    } catch (error) {
      console.error("링크 추가 중 오류 발생:", error);
      toast("warn", "링크 추가 중 오류가 발생했습니다.");
    }
  });
  const onModalAddLinkSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { folderId, url } = values;

      if (!url || url.length === 0) {
        toast("warn", "링크를 입력하세요.");
        return;
      }
      if (!folderId) {
        handleAddLinkSubmit(url);
        return;
      }
      onAddLinkSubmit();
    },
    [values]
  );
  const handleAddLinkSubmit = useCallback((url) => {
    openModal(
      <>
        <h5 className={styles.modalTitle}>폴더에 추가</h5>
        <form onSubmit={onAddLinkSubmit}>
          <div className={styles.inputGroup}>
            <p className={styles.subTitle}>{url}</p>
            <ul>
              {folders.map((folder) => (
                <li key={folder.id}>
                  <label>
                    <span>{folder.name}</span>
                    <span>{folder.id}개 링크</span>
                    <input name="folder" type="radio" />
                  </label>
                </li>
              ))}
            </ul>
            <Button type="submit" color="Primary" size="lg">
              추가하기
            </Button>
          </div>
        </form>
      </>
    );
  }, []);

  const getFolders = useCallback(async () => {
    try {
      const url = values.folderId ? `/folders/${values.folderId}` : `/folders`;
      const res = await axios.get(url);
      setFolders(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("폴더 조회 중 오류 발생:", error);
      toast("warn", "폴더 조회 중 오류가 발생했습니다.");
    }
  }, [values.folderId]);

  async function getModalFolders() {
    try {
      const res = await axios.get(`/folders`);
      setModalFolders(res.data);
    } catch (error) {
      console.error("폴더 조회 중 오류 발생:", error);
    }
  }

  const getSearchLinks = useCallback(async () => {
    try {
      const res = await axios.get(`/links?search=${searchTerm}`);
      setFilteredLinks(res.data.list || []);
    } catch (error) {
      console.error("링크 조회 중 오류 발생:", error);
      toast("warn", "링크 조회 중 오류가 발생했습니다.");
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      getSearchLinks();
    } else {
      getFolders();
    }
  }, [searchTerm, getSearchLinks, getFolders]);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term.toLowerCase());
    }, 300),
    []
  );
  const handleSearchChange = useCallback(
    (e) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const hasSearchTerm = searchTerm.length > 0;
  const noResults = filteredLinks.length === 0 && hasSearchTerm;

  return (
    <>
      <section className={styles.linkHeader}>
        <form className={styles.linkInputGroup} onSubmit={onModalAddLinkSubmit}>
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
      </section>
    </>
  );
}

export default LinkPage;
