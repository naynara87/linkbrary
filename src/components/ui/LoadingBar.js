import style from "./LoadingBar.module.scss";

function LoadingBar() {
  return (
    <div className={style.loadingWrap}>
      <div className={style.loader}>Loading...</div>
    </div>
  );
}

export default LoadingBar;
