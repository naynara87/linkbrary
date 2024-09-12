import { useState, useCallback, useRef } from "react";
import style from "./Dropdown.module.scss";
import Button from "./Button";
import { useModal } from "../../contexts/ModalProvider";
import axios from "../../lib/axios";
import { useToaster } from "../../contexts/ToasterProvider";

function Dropdown({ linkId, linkUrl: initialLinkUrl }) {
  const linkUrlRef = useRef(null);
  const [linkUrl, setLinkUrl] = useState(initialLinkUrl);
  const { openModal, closeModal } = useModal();
  const toast = useToaster();

  const onDeleteLink = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios.delete(`/links/${linkId}`);
        toast("info", "링크가 삭제되었습니다.");
      } catch (error) {
        console.error("링크 삭제 중 오류 발생:", error);
        toast("warn", "링크 삭제에 실패했습니다.");
      } finally {
        closeModal();
      }
    },
    [linkId, toast, closeModal]
  );

  const onEditLink = useCallback(
    async (e) => {
      e.preventDefault();
      const newLinkUrl = linkUrlRef.current.value.trim();

      if (!newLinkUrl) {
        toast("warn", "링크 이름을 입력해 주세요.");
        return;
      }

      try {
        await axios.put(`/links/${linkId}`, { url: newLinkUrl });
        toast("info", "링크가 수정되었습니다.");
        closeModal();
      } catch (error) {
        console.error("링크 수정 중 오류 발생:", error);
        toast("warn", "링크 수정에 실패했습니다.");
      }
    },
    [linkId, toast, closeModal]
  );

  const handleDeleteLink = useCallback(() => {
    openModal(
      <>
        <h5 className={style.modalTitle}>링크 삭제</h5>
        <form onSubmit={onDeleteLink}>
          <div className={style.inputGroup}>
            <p className={style.subTitle}>{linkUrl}</p>
            <Button type="submit" color="Delete" size="lg">
              삭제하기
            </Button>
          </div>
        </form>
      </>
    );
  }, [openModal, linkUrl, onDeleteLink]);

  const handleLinkEdit = useCallback(() => {
    openModal(
      <>
        <h5 className={style.modalTitle}>링크 수정</h5>
        <form onSubmit={onEditLink}>
          <div className={style.inputGroup}>
            <input
              className={style.inputText}
              type="text"
              placeholder="새 링크 입력"
              defaultValue={linkUrl}
              ref={linkUrlRef}
            />
            <Button type="submit" color="Primary" size="lg">
              수정하기
            </Button>
          </div>
        </form>
      </>
    );
  }, [openModal, linkUrl, onEditLink]);

  return (
    <div className={style.dropdown}>
      <ul>
        <li>
          <Button onClick={handleDeleteLink}>삭제하기</Button>
        </li>
        <li>
          <Button onClick={handleLinkEdit}>수정하기</Button>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
