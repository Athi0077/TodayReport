import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import "./auth.css";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "https://todayreport-1.onrender.com/api/auth/login",
        form
      );

      // save token
      localStorage.setItem("token", res.data.token);

      localStorage.setItem("role", res.data.role);
      localStorage.setItem("adminId", res.data.id);
      localStorage.setItem("adminName", res.data.name);

      // redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user-home");
      }

    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-avatar">
          <FaUserCircle size={80} />
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <FaEnvelope className="auth-icon" />
            <input
              className="auth-input"
              type="email"
              placeholder="Email ID"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="auth-input-group">
            <FaLock className="auth-icon" />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <div className="auth-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot-password">Forgot Password?</span>
          </div>

          <button className="auth-btn">LOGIN</button>
          <p className="auth-link-text">
            Don't have an account? <span className="auth-link" onClick={() => navigate("/register")}>Register here</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;