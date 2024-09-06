import style from "./Modal.module.scss";
import Button from "./Button";
import Icon from "./Icon";

function Modal() {
  return (
    <div className={style.modalBg}>
      <div className={style.modal}>
        <Button type="button" className={style.buttonClose}>
          <Icon type="close" />
        </Button>
        <div className={style.modalContents}>
          <h5 className={style.modalTitle}>폴더 삭제</h5>
          <p className={style.folderName}>폴더명</p>
          <Button type="button" shape="Delete" size="lg">
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
