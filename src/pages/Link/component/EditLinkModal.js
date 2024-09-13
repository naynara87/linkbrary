import { useCallback, useRef } from "react";
import style from "./EditLinkModal.module.scss";
import Button from "../../../components/ui/Button";
import axios from "../../../lib/axios";
import { useToaster } from "../../../contexts/ToasterProvider";
import { useModal } from "../../../contexts/ModalProvider";

function EditLinkModal({ linkId, linkUrl }) {
  const linkUrlRef = useRef(null);
  const toast = useToaster();
  const { closeModal } = useModal();

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

  return (
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
}

export default EditLinkModal;
