import { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import Button from "../components/Button";
import heroImg from "../assets/pakghor.jpg"; // replace with your image

const LandingPage = () => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  return (
    <section className={styles.landing}>
      <div className={styles.hero}>
        <div className={styles.particles}>
          {particles.map((p) => (
            <div key={p} className={styles.particle}></div>
          ))}
        </div>

        <div className={styles.content}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.brand}>Pakghor</span>
          </h1>
          <p className={styles.heroText}>
            Fresh, street-style fast food made with love in Mymensingh.
          </p>
          <div className={styles.buttons}>
            <Button text="See Menu" type="primary" filled to="/app/home" />
            <Button
              text="Order Now"
              type="secondary"
              filled
              to="/app/checkout"
            />
          </div>
        </div>

        <div className={styles.heroImage}>
          <img src={heroImg} alt="Pakghor Special" />
        </div>
      </div>

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
