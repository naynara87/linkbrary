import React from "react";
import styles from "./Icon.module.scss";

const Icon = ({ type, size = "md", className = "", ...props }) => {
  const iconClass = [
    styles.icon,
    styles[`icon_${size}`],
    styles[`ic_${type}`],
    className,
  ].join(" ");

  return <i className={iconClass} {...props}></i>;
};

export default Icon;
