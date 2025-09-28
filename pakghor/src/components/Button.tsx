import type { ButtonInterface } from "../types";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ text, filled, type, to, icon }: ButtonInterface) => {
  const filledClass = filled ? styles.filled : "";

  // If "to" is provid, else use button
  return to ? (
    <Link
      to={to}
      className={`${styles.btn} ${styles[type.toLowerCase()]} ${filledClass}`}
    >
      <span>{text}</span>
      {icon}
    </Link>
  ) : (
    <button
      className={`${styles.btn} ${styles[type.toLowerCase()]} ${filledClass}`}
    >
      <span>{text}</span>
      {icon}
    </button>
  );
};

export default Button;
