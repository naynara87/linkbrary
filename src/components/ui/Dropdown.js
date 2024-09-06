import style from "./Dropdown.module.scss";
import Button from "./Button";
function Dropdown() {
  return (
    <div className={style.dropdown}>
      <ul>
        <li>
          <Button>삭제하기</Button>
        </li>
        <li>
          <Button>수정하기</Button>
        </li>
      </ul>
    </div>
  );
}
export default Dropdown;
