import style from "./Pagination.module.scss";
import Button from "./Button";
import Icon from "./Icon";

function Pagination() {
  return (
    <div className={style.pagination}>
      <ul>
        <li>
          <Button type="button">
            <Icon type="arrowLeft" size="sm" />
          </Button>
        </li>
        <li>
          <Button type="button">1</Button>
        </li>
        <li>
          <Button type="button">2</Button>
        </li>
        <li>
          <Button type="button">3</Button>
        </li>
        <li>
          <Button type="button">...</Button>
        </li>
        <li>
          <Button type="button">9</Button>
        </li>
        <li>
          <Button type="button">
            <Icon type="arrowRight" size="sm" />
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
