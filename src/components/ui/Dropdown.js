import style from "./Dropdown.module.scss";
import Button from "./Button";
import { useModal } from "../../contexts/ModalProvider";
import axios from "../../lib/axios";

function Dropdown({ linkId }) {
  const { openModal } = useModal();

  const handleLinkDelete = async () => {
    try {
      await axios.delete(`/links/${linkId}`);
      alert("링크가 삭제되었습니다.");
    } catch (error) {
      console.error("링크 삭제 중 오류 발생:", error);
      alert("링크 삭제에 실패했습니다.");
    }
  };
  function handleLinkMove() {
    openModal(
      <div>
        <h4>링크 수정</h4>
        <Button
          type="button"
          color="primary"
          onClick={() => alert("링크 수정 완료!")}
        >
          수정하기
        </Button>
      </div>
    );
  }
  return (
    <div className={style.dropdown}>
      <ul>
        <li>
          <Button onClick={handleLinkDelete}>삭제하기</Button>
        </li>
        <li>
          <Button onClick={handleLinkMove}>수정하기</Button>
        </li>
      </ul>
    </div>
  );
}
export default Dropdown;
