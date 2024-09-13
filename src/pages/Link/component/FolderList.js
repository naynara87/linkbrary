import { useState, useEffect, useRef } from "react";
import style from "./FolderList.module.scss";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import axios from "../../../lib/axios";
import { useModal } from "../../../contexts/ModalProvider";
import { useToaster } from "../../../contexts/ToasterProvider";

function FolderList({ folders, onFolderSelect, getFolders }) {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const folderNameRef = useRef(null);
  const { openModal, closeModal } = useModal();
  const toast = useToaster();

  async function onSubmitFolder(e) {
    e.preventDefault();
    const folderName = folderNameRef.current.value.trim();
    if (!folderName) {
      toast("warn", "폴더명을 입력해 주세요.");
      return;
    }
    try {
      await axios.post(`/folders`, { name: folderName });
      toast("info", "폴더가 생성되었습니다.");
      await getFolders();
      folderNameRef.current.value = "";
    } catch (error) {
      console.error("폴더 추가 중 오류 발생:", error);
    } finally {
      closeModal();
    }
  }

  function handleAddFolder() {
    openModal(
      <>
        <h5 className={style.modalTitle}>폴더 추가</h5>
        <form onSubmit={onSubmitFolder}>
          <div className={style.inputGroup}>
            <input
              className={style.inputText}
              type="text"
              placeholder="내용 입력"
              ref={folderNameRef}
            />
            <Button type="submit" color="Primary" size="lg">
              추가하기
            </Button>
          </div>
        </form>
      </>
    );
  }

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId);
    onFolderSelect(folderId);
  };

  useEffect(() => {
    getFolders();
    setSelectedFolderId(null);
  }, []);

  return (
    <div className={style.folderGroup}>
      <Button
        type="button"
        shape="Outline"
        active={selectedFolderId === null}
        onClick={() => handleFolderClick(null)}
      >
        전체
      </Button>
      {folders.map((folder) => (
        <Button
          key={folder.id}
          type="button"
          shape="Outline"
          active={selectedFolderId === folder.id}
          onClick={() => handleFolderClick(folder.id)}
        >
          {folder.name}
        </Button>
      ))}
      <Button
        type="button"
        shape="Text"
        color="FolderAdd"
        onClick={handleAddFolder}
      >
        폴더 추가
        <Icon type="plus" />
      </Button>
    </div>
  );
}

export default FolderList;
