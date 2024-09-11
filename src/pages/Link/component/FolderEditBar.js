import { useState, useEffect } from "react";
import style from "./FolderEditBar.module.scss";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import axios from "../../../lib/axios";
import { useModal } from "../../../contexts/ModalProvider";

function FolderEditBar({ folderId }) {
  const [folderName, setFolderName] = useState("");
  const { openModal } = useModal();

  async function fetchFolderInfo() {
    if (folderId) {
      try {
        const res = await axios.get(`/folders/${folderId}`);
        setFolderName(res.data.name);
      } catch (error) {
        console.error("폴더 정보 조회 중 오류 발생:", error);
      }
    } else {
      setFolderName("전체");
    }
  }
  function handleRename() {
    openModal(
      <div>
        <h4>폴더 이름 변경</h4>
        <input type="text" placeholder="새 폴더 이름 입력" />
        <Button
          type="button"
          color="primary"
          onClick={() => alert("이름 변경 완료!")}
        >
          확인
        </Button>
      </div>
    );
  }
  function handleDelete() {
    openModal(
      <div>
        <div>
          <h5 className={style.modalTitle}>폴더 이름 변경</h5>
          <form>
            <div className={style.inputGroup}>
              <Button type="submit" color="Delete" size="lg">
                삭제하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  function handleShare() {
    openModal(
      <div>
        <h5 className={style.modalTitle}>폴더 이름 변경</h5>
        <form>
          <div className={style.inputGroup}>
            <input
              className={style.inputText}
              type="text"
              placeholder="내용 입력"
              value=""
            />
            <Button type="submit" color="Primary" size="lg">
              추가하기
            </Button>
          </div>
        </form>
      </div>
    );
  }
  useEffect(() => {
    fetchFolderInfo();
  }, [folderName]);

  return (
    <div className={style.cardGroupHeader}>
      <h4>{folderName}</h4>
      <div className={style.optionGroup}>
        <Button shape="Option" onClick={handleShare}>
          <Icon type="share" /> 공유
        </Button>
        <Button shape="Option" onClick={handleRename}>
          <Icon type="pen" /> 이름 변경
        </Button>
        <Button shape="Option" onClick={handleDelete}>
          <Icon type="delete" /> 삭제
        </Button>
      </div>
    </div>
  );
}

export default FolderEditBar;
