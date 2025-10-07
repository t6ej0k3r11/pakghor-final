import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      setMsg("⚠️ Please enter both username/email and password");
      return;
    }

    try {
      // Call live API
      // const res = await fetch(
      // "https://pakghor-final-658f.vercel.app/api/login",
      // "/api/login",
      // "http://localhost:5000/api/login",
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Login successful!");
        sessionStorage.setItem("token", data.token); // store real token

        setUsernameOrEmail("");
        setPass("");

        setTimeout(() => {
          if (data.username && data.username.startsWith("a-")) {
            navigate("/app/admin");
          } else {
            navigate("/app/Home");
          }
        }, 1500);
      } else {
        setMsg(data.error || "❌ Invalid credentials");
      }
    } catch (err) {
      setMsg("⚠️ Server error, please try again later.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <Link to="/app/home">
          <img src={logo} alt="Pakghor Logo" className="login-logo" />
        </Link>
        <h2 className="login-title">Welcome Back 👋</h2>

        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="login-input"
        />

        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>

        <button className="signup-btn" onClick={() => navigate("/signup")}>
          Create Account
        </button>

        {msg && <p className="login-msg">{msg}</p>}
      </div>
    </div>
  );
};

export default Login;
