import { useCallback } from "react";
import style from "./DeleteLinkModal.module.scss";
import Button from "../../../components/ui/Button";
import axios from "../../../lib/axios";
import { useToaster } from "../../../contexts/ToasterProvider";
import { useModal } from "../../../contexts/ModalProvider";

function DeleteLinkModal({ linkId, linkUrl }) {
  const toast = useToaster();
  const { closeModal } = useModal();

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

  return (
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
}

export default DeleteLinkModal;
