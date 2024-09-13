import { useCallback } from "react";
import style from "./Dropdown.module.scss";
import Button from "../../../components/ui/Button";
import DeleteLinkModal from "./DeleteLinkModal";
import EditLinkModal from "./EditLinkModal";
import { useModal } from "../../../contexts/ModalProvider";

function Dropdown({ linkId, linkUrl, fetchLinks }) {
  const { openModal } = useModal();
  const handleDeleteLink = useCallback(() => {
    openModal(
      <DeleteLinkModal
        linkId={linkId}
        linkUrl={linkUrl}
        fetchLinks={fetchLinks}
      />
    );
  }, [linkId, linkUrl, openModal]);

  const handleLinkEdit = useCallback(() => {
    openModal(
      <EditLinkModal
        linkId={linkId}
        linkUrl={linkUrl}
        fetchLinks={fetchLinks}
      />
    );
  }, [linkId, linkUrl, openModal]);

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
