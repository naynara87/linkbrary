import classNames from "classnames";
import styles from "./Button.module.scss";

function Button({
  className = "",
  color = "primary",
  size = "",
  shape = "",
  type = "button",
  active = false, // Boolean 값으로 받음
  disabled = false,
  as: AsComponent,
  children,
  ...rest
}) {
  // classNames 라이브러리로 클래스 조합
  const buttonClass = classNames(
    styles.button,
    styles[`size_${size}`],
    styles[`button${shape}`],
    styles[`button${color}`],
    { [styles.on]: active },
    className
  );

  if (AsComponent) {
    return (
      <AsComponent className={buttonClass} {...rest}>
        {children}
      </AsComponent>
    );
  }

  return (
    <button className={buttonClass} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;
