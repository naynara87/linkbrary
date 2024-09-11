import style from "./Loading.module.scss";

function Loading() {
  return (
    <div className={style.loadingWrap}>
      <div className={style.loader}>Loading...</div>
    </div>
  );
}

export default Loading;
