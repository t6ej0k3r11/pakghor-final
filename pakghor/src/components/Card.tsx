import type { CardInterface } from "../types";
import styles from "./Card.module.css";
import Badge from "./Badge";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

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
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    const price = Number(indicator?.replace(/[^0-9]/g, "")) || 0;

    addToCart({
      name: title,
      price,
      qty: 1,
    });

    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    } else {
      alert(`${title} added to cart!`);
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

        <div onClick={handleAddToCart}>
          <Button text="Add to Cart" filled type="primary" to="#" icon={null} />
        </div>
      </div>
    </article>
  );
};

export default Card;
