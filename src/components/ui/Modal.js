import style from "./Modal.module.scss";
import Button from "./Button";
import Icon from "./Icon";
import { useModal } from "../../contexts/ModalProvider";

function Modal() {
  const { isModalOpen, modalContent, closeModal } = useModal();
  if (!isModalOpen) return null;

  return (
    <div className={style.modalBg} onClick={closeModal}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <Button
          type="button"
          className={style.buttonClose}
          onClick={closeModal}
        >
          <Icon type="close" />
        </Button>
        <div className={style.modalContents}>{modalContent}</div>
      </div>
    </div>
  );
}

export default Modal;
