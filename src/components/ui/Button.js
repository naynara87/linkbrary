import styles from "./Button.module.scss";

function Button({
  className = "",
  color = "primary",
  size = "md",
  type = "button",
  disabled = false,
  as: AsComponent,
  children,
  ...rest
}) {
  const buttonClass = `
    ${styles.button}
    ${styles[`size${size}`]}
    ${styles[`button${color}`]} 
    ${className}
  `.trim();

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
