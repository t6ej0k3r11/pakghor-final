import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3 className="brand">PakGhor</h3>
        <p className="tagline">
          Fresh • Delicious • Crafted with ❤️ for every bite.
        </p>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/PakGhorMymensingh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon size={22} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={22} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <TwitterIcon size={22} />
          </a>
        </div>
      </div>

      <div className="divider"></div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} t63j0ker. All rights reserved.</p>
        <p>
          Made with <span className="heart">❤</span> in Mymensingh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
