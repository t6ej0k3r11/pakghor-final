import type { CardInterface } from "../types";
import styles from "./Card.module.css";
import Badge from "./Badge";
import Button from "./Button"; // ✅ use reusable Button
import { useNavigate, Link } from "react-router-dom";

const Card = ({
  body,
  title,
  badge,
  image,
  indicator,
  subtitle,
  link,
}: CardInterface) => {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("token");

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <article className={`${styles.card} shadow-card`}>
      {indicator && <small className={styles.indicator}>{indicator}</small>}

      {badge && <Badge text={badge.text} filled={badge.filled} />}

      {image && (
        <Link to={link || "#"} className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </Link>
      )}

      <div className={styles.content}>
        <Link to={link || "#"} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        {subtitle && <small className={styles.subtitle}>{subtitle}</small>}
        <p className={styles.body}>{body}</p>

        {/* ✅ Styled Button with redirect logic */}
        <div onClick={handleButtonClick}>
          <Button
            text="Order Now"
            filled={true}
            type="primary"
            to="#" // placeholder, navigation handled by handleButtonClick
            icon={null}
          />
        </div>
      </div>
    </article>
  );
};

export default Card;
