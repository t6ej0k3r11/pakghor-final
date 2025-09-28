import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Signup() {
  const [username, setUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      // .post("http://localhost:5000/api/register", { username, email, mobile, password })
      .post("https://pakghor-final-658f.vercel.app/api/register", {
        username,
        email,
        mobile,
        password,
      })
      .then(() => {
        setMsg("✅ Account created successfully!");
        setUser("");
        setEmail("");
        setMobile("");
        setPass("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch(() => {
        setMsg("❌ Signup failed. Try again.");
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <Link to="/home">
          <img src={logo} alt="Pakghor Logo" className="signup-logo" />
        </Link>
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            pattern="[0-9]{10,15}"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </form>

        {msg && <p className="signup-msg">{msg}</p>}
      </div>
    </div>
  );
}

export default Signup;
