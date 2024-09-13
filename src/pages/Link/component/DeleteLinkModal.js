import { useCallback } from "react";
import style from "./DeleteLinkModal.module.scss";
import Button from "../../../components/ui/Button";
import { useToaster } from "../../../contexts/ToasterProvider";
import { useModal } from "../../../contexts/ModalProvider";
import { useLink } from "../../../contexts/LinkProvider";

function DeleteLinkModal({ linkId, linkUrl, fetchLinks }) {
  const toast = useToaster();
  const { closeModal } = useModal();
  const { deleteLinkById } = useLink();

  const onDeleteLink = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await deleteLinkById(linkId);
        toast("info", "링크가 삭제되었습니다.");
        fetchLinks();
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
