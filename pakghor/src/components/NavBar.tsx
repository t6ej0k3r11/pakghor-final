import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.jpg";
import "./Navbar.css";

interface NavBarProps {
  brandName: string;
  logoSrc?: string;
  navItems: string[];
}

const NavBar = ({ brandName, navItems }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("token");

  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    setIsOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Search functionality coming soon!");
  };

  const getPath = (item: string) =>
    item.toLowerCase() === "home" ? "/app/home" : `/app/${item.toLowerCase()}`;

  return (
    <nav className="navbar-modern">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <img src={logo} alt="Logo" />
          <span>{brandName}</span>
        </Link>

        <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-items ${isOpen ? "open" : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item}>
                <NavLink
                  to={getPath(item)}
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          <form className="navbar-search" onSubmit={handleSearch}>
            <input type="search" placeholder="Search..." />
            <button type="submit">Go</button>
          </form>

          <div className="cart-wrapper">
            <Link
              to={isLoggedIn ? "/app/checkout" : "/login"}
              className="cart-button"
              onClick={() => setIsOpen(false)}
            >
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>

          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="nav-button"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="nav-button"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
