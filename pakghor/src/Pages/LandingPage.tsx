import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import heroImg from "../assets/burger.jpg";

const LandingPage = () => {
  return (
    <section className={styles.landing}>
      <div className={styles.hero}>
        <div className={styles.text}>
          <h1>
            Welcome to <span className={styles.brand}>Pakghor</span>
          </h1>
          <p>
            Delicious street-style fast food made fresh every day in Mymensingh.
          </p>
          <div className={styles.buttons}>
            <Link to="/app/home" className={styles.primaryBtn}>
              See Menu
            </Link>
            <Link to="/app/checkout" className={styles.secondaryBtn}>
              Order Now
            </Link>
          </div>
        </div>

        <div className={styles.image}>
          <img src={heroImg} alt="Pakghor Special Burger" />
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} Pakghor — Mymensingh’s Favorite Street
          Food
        </p>
      </footer>
    </section>
  );
};

export default LandingPage;
