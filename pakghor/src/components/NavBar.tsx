import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./Navbar.css";

interface NavBarProps {
  brandName: string;
  navItems: string[];
}

const NavBar = ({ brandName, navItems }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const storedAuthToken = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const isLoggedIn = !!storedAuthToken;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const getPath = (item: string) =>
    item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;

  return (
    <nav className="navbar-modern">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <img src={logo} alt="Logo" />
          <span>{brandName}</span>
        </Link>

        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-items ${isOpen ? "open" : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item}>
                <Link to={getPath(item)}>{item}</Link>
              </li>
            ))}
          </ul>

          <form className="navbar-search">
            <input type="search" placeholder="Search..." />
            <button type="submit">Go</button>
          </form>

          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-button">
                  Login
                </Link>
                <Link to="/signup" className="nav-button">
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
