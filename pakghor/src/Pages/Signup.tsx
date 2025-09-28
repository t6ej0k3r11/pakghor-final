import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // create this CSS file

function Signup() {
  const [username, setUser] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", { username, password })
      .then(() => {
        setMsg("✅ Account created successfully!");
        setUser("");
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
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
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
