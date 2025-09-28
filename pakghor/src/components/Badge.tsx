import type { BadgeInterface } from "../types";
import styles from "./Badge.module.css";

const Badge = ({ text, filled }: BadgeInterface) => {
  const filledClass = filled ? styles.filled : styles.outlined;

  return (
    <small className={`${styles.badge} ${filledClass}`}>
      {text.toUpperCase()}
    </small>
  );
};

export default Badge;
