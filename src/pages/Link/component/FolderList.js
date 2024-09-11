import { useState, useEffect } from "react";
import style from "./FolderList.module.scss";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import axios from "../../../lib/axios";
import { useModal } from "../../../contexts/ModalProvider";

function FolderList({ onFolderSelect }) {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [values, setValues] = useState({ name: "" });
  const { openModal } = useModal();

  async function getFolders() {
    try {
      const res = await axios.get(`/folders`);
      setFolders(res.data);
    } catch (error) {
      console.error("폴더 조회 중 오류 발생:", error);
    }
  }

  async function handleSubmitFolder(e) {
    e.preventDefault();
    try {
      await axios.post(`/folders`, { name: values.name });
      alert("폴더가 생성되었습니다.");
      getFolders();
      setValues({ name: "" });
    } catch (error) {
      console.error("폴더 추가 중 오류 발생:", error);
    }
  }

  function handleAddFolder() {
    openModal(
      <div>
        <h5 className={style.modalTitle}>폴더 추가</h5>
        <form onSubmit={handleSubmitFolder}>
          <div className={style.inputGroup}>
            <input
              className={style.inputText}
              type="text"
              placeholder="내용 입력"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <Button type="submit" color="Primary" size="lg">
              추가하기
            </Button>
          </div>
        </form>
      </div>
    );
  }

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId);
    onFolderSelect(folderId);
    console.log(folderId, "폴더아이디");
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
        className="mlAuto"
        onClick={handleAddFolder}
      >
        폴더추가
        <Icon type="plus" />
      </Button>
    </div>
  );
}

export default FolderList;
