import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "./LinkPage.module.scss";
import Button from "../../components/ui/Button";
import axios from "../../lib/axios";
import LinkGroup from "./component/LinkGroup";
import FolderList from "./component/FolderList";
import LinkCard from "./component/LinkCard";
import debounce from "lodash.debounce";
import { useModal } from "../../contexts/ModalProvider";
import { useToaster } from "../../contexts/ToasterProvider";

// 링크가 없을 때 컴포넌트
function LinkListNone() {
  return (
    <div className={styles.searchNone}>
      <p>링크가 없습니다.</p>
    </div>
  );
}

// 링크 추가 폼 컴포넌트
const LinkAddForm = ({ onSubmit, value, onChange }) => (
  <form className={styles.linkInputGroup} onSubmit={onSubmit}>
    <input
      className={styles.inputText}
      type="text"
      placeholder="링크를 추가해 보세요"
      value={value}
      onChange={onChange}
    />
    <Button type="submit" size="sm" color="Primary" aria-label="링크 추가 버튼">
      추가하기
    </Button>
  </form>
);

// 검색 입력 필드 컴포넌트
const SearchInput = ({ onChange }) => (
  <div className={styles.linkSearchGroup}>
    <input
      className={styles.linkSearch}
      placeholder="링크를 검색해 보세요."
      onChange={onChange}
    />
  </div>
);

function LinkPage() {
  const { closeModal } = useModal();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToaster();

  const [values, setValues] = useState({ folderId: null, url: "" });
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [updateLink, setUpdateLink] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleFolderSelect = useCallback((folderId) => {
    setSelectedFolderId(folderId);
    setValues((prevValues) => ({ ...prevValues, folderId }));
  }, []);

  const onAddLinkSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { folderId, url } = values;

      if (!url) {
        toast("warn", "링크를 입력하세요.");
        return;
      }
      if (!folderId) {
        toast("warn", "폴더를 선택하세요.");
        return;
      }
      try {
        await axios.post(`/links`, { folderId, url });
        setValues((prev) => ({ ...prev, url: "" }));
        toast("info", "링크가 성공적으로 추가되었습니다.");
        setUpdateLink((prev) => !prev);
      } catch (error) {
        console.error("링크 추가 중 오류 발생:", error);
        toast("warn", "링크 추가 중 오류가 발생했습니다.");
      } finally {
        closeModal();
      }
    },
    [values, toast, closeModal]
  );

  const fetchFolders = useCallback(async () => {
    try {
      const res = await axios.get(`/folders`);
      setFolders(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("모든 폴더 조회 중 오류 발생:", error);
      toast("warn", "모든 폴더 조회 중 오류가 발생했습니다.");
    }
  }, [toast]);

  const fetchLinksByFolder = useCallback(async () => {
    if (!selectedFolderId) return;

    try {
      const res = await axios.get(`/folders/${selectedFolderId}`);
      setFilteredLinks(res.data.links || []);
    } catch (error) {
      console.error("특정 폴더 조회 중 오류 발생:", error);
      toast("warn", "특정 폴더 조회 중 오류가 발생했습니다.");
    }
  }, [selectedFolderId, toast]);

  const fetchSearchLinks = useCallback(async () => {
    if (!searchTerm) return;

    try {
      const res = await axios.get(`/links?search=${searchTerm}`);
      setFilteredLinks(res.data.list || []);
    } catch (error) {
      console.error("링크 조회 중 오류 발생:", error);
      toast("warn", "링크 조회 중 오류가 발생했습니다.");
    }
  }, [searchTerm, toast]);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchLinks();
    } else if (selectedFolderId) {
      fetchLinksByFolder();
    } else {
      fetchFolders();
    }
  }, [
    searchTerm,
    selectedFolderId,
    fetchSearchLinks,
    fetchLinksByFolder,
    fetchFolders,
  ]);

  const debouncedSearch = useCallback(
    debounce((term) => setSearchTerm(term.toLowerCase()), 300),
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
        <LinkAddForm
          onSubmit={onAddLinkSubmit}
          value={values.url}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, url: e.target.value }))
          }
        />
      </section>
      <section className={styles.linkContents}>
        <SearchInput onChange={handleSearchChange} />

        {hasSearchTerm ? (
          <>
            <h5 className={styles.searchTerm}>
              <em>{searchTerm}</em>으로 검색한 결과입니다.
            </h5>
            {noResults ? (
              <LinkListNone />
            ) : (
              <div className={styles.cardGroup}>
                <div className={styles.cardList}>
                  {filteredLinks.map((link) => (
                    <LinkCard key={link.id} {...link} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <FolderList
              onFolderSelect={handleFolderSelect}
              getFolders={fetchFolders}
              folders={folders}
            />
            {selectedFolderId ? (
              <LinkGroup
                key={selectedFolderId}
                folderId={selectedFolderId}
                updateLink={updateLink}
                getFolders={fetchFolders}
              />
            ) : folders.length === 0 ? (
              <LinkListNone />
            ) : (
              folders.map((folder) => (
                <LinkGroup
                  key={folder.id}
                  folderId={folder.id}
                  updateLink={updateLink}
                  getFolders={fetchFolders}
                />
              ))
            )}
          </>
        )}
      </section>
    </>
  );
}

export default LinkPage;
