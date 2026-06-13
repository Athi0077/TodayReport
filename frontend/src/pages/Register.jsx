import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "./auth.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "https://todayreport-1.onrender.com/api/auth/register",
        form
      );

      alert("Registered Successfully");

      navigate("/");

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
            <FaUser className="auth-icon" />
            <input
              className="auth-input"
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

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

          <button className="auth-btn">REGISTER</button>
          <p className="auth-link-text">
            Already have an account? <span className="auth-link" onClick={() => navigate("/")}>Login here</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;