import style from "./CardEditBar.module.scss";
import Button from "./Button";
import Icon from "./Icon";

function CardEditBar() {
  return (
    <div className={style.cardGroupHeader}>
      <h4>유용한 글</h4>
      <div className={style.optionGroup}>
        <Button shape="Option">
          <Icon type="share" /> 공유
        </Button>
        <Button shape="Option">
          <Icon type="pen" /> 이름 변경
        </Button>
        <Button shape="Option">
          <Icon type="delete" /> 삭제
        </Button>
      </div>
    </div>
  );
}

export default CardEditBar;
