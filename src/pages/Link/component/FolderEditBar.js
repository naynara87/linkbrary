import { useState, useEffect, useCallback, useRef } from "react";
import style from "./FolderEditBar.module.scss";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import axios from "../../../lib/axios";
import { useModal } from "../../../contexts/ModalProvider";
import { useToaster } from "../../../contexts/ToasterProvider";

function FolderEditBar({ folderId }) {
  const [folderName, setFolderName] = useState("");
  const { openModal, closeModal } = useModal();
  const folderNameRef = useRef(null);
  const toast = useToaster();

  const fetchFolderInfo = useCallback(async () => {
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
  }, [folderId]);

  useEffect(() => {
    fetchFolderInfo();
  }, [fetchFolderInfo]);

  async function onSubmitRenameFolder(e) {
    e.preventDefault();
    console.log("클릭");
    const newFolderName = folderNameRef.current.value.trim();
    if (!newFolderName) {
      toast("warn", "폴더명을 입력해 주세요.");
      return;
    }
    try {
      await axios.put(`/folders/${folderId}`, { name: newFolderName });
      toast("info", "폴더명이 수정되었습니다.");
      fetchFolderInfo();
      closeModal();
    } catch (error) {
      console.error("폴더 이름 변경 중 오류 발생:", error);
    }
  }

  const handleRename = useCallback(() => {
    openModal(
      <>
        <h5 className={style.modalTitle}>폴더 이름 변경</h5>
        <form onSubmit={onSubmitRenameFolder}>
          <div className={style.inputGroup}>
            <input
              className={style.inputText}
              type="text"
              placeholder="새 폴더 이름 입력"
              defaultValue={folderName}
              ref={folderNameRef}
            />
            <Button type="submit" color="Primary" size="lg">
              확인
            </Button>
          </div>
        </form>
      </>
    );
  }, [openModal, folderName, onSubmitRenameFolder]);

  async function onDeleteFolder(e) {
    e.preventDefault();
    try {
      await axios.delete(`/folders/${folderId}`);
      toast("info", "폴더가 삭제되었습니다.");
      fetchFolderInfo();
      closeModal();
    } catch (error) {
      console.error("폴더 삭제 중 오류 발생:", error);
    }
  }
  const handleDeleteFolder = useCallback(() => {
    openModal(
      <>
        <h5 className={style.modalTitle}>폴더 삭제</h5>
        <form onSubmit={onDeleteFolder}>
          <div className={style.inputGroup}>
            <p class={style.subTitle}>{folderName}</p>
            <Button type="button" color="Delete" size="lg">
              삭제하기
            </Button>
          </div>
        </form>
      </>
    );
  }, [openModal, folderName, onDeleteFolder]);

  const handleShare = useCallback(() => {
    openModal(
      <>
        <h5 className={style.modalTitle}>폴더 공유</h5>
        <div className={style.inputGroup}>
          <p class={style.subTitle}>{folderName}</p>
          <ul className={style.shareLinks}>
            <li>
              <Button
                type="button"
                className="buttonCircle"
                onClick={() => alert("준비 중입니다")}
              >
                <Icon type="kakaoColor" size="lg" className="icon_full" />
              </Button>
              <label>카카오톡</label>
            </li>
            <li>
              <Button
                type="button"
                className="buttonCircle"
                onClick={() => alert("준비 중입니다")}
              >
                <Icon type="facebookColor" size="lg" className="icon_full" />
              </Button>
              <label>페이스북</label>
            </li>
            <li>
              <Button
                type="button"
                className="buttonCircle"
                onClick={() => alert("준비 중입니다")}
              >
                <Icon type="linkColor" size="lg" className="icon_full" />
              </Button>
              <label>링크 복사</label>
            </li>
          </ul>
        </div>
      </>
    );
  }, [openModal, folderName]);

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
        <Button shape="Option" onClick={handleDeleteFolder}>
          <Icon type="delete" /> 삭제
        </Button>
      </div>
    </div>
  );
}

export default FolderEditBar;
