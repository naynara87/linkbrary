import style from "./Modal.module.scss";
import Button from "./Button";
import Icon from "./Icon";

function Modal({ closeModal, modalContents }) {
  return (
    <div className={style.modalBg}>
      <div className={style.modal}>
        <Button
          type="button"
          className={style.buttonClose}
          onClick={closeModal} // 모달 닫기 기능
        >
          <Icon type="close" />
        </Button>
        <div className={style.modalContents}>
          {modalContents} {/* 동적으로 전달된 콘텐츠를 렌더링 */}
          {/* <h5 className={style.modalTitle}>폴더 삭제</h5>
          <p className={style.folderName}>폴더명</p>
          <Button type="button" shape="Delete" size="lg">
            삭제하기
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
