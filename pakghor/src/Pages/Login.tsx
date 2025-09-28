import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUser] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Login successful!");
        sessionStorage.setItem("token", "pakghor-token");

        const loggedUser = username;

        setUser("");
        setPass("");

        setTimeout(() => {
          if (loggedUser.startsWith("a-")) {
            navigate("/admin");
          } else {
            navigate("/Home");
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
        <img src={logo} alt="Pakghor Logo" className="login-logo" />
        <h2 className="login-title">Welcome Back 👋</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
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
