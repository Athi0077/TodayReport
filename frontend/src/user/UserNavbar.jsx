import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./user.css";

function UserNavbar() {
const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="user-navbar">

      <h1>TodayReport</h1>

      <div className="user-links">

        <Link to="/user-home">
          Home
        </Link>

        <Link to="/suggest-news">
          Suggest News
        </Link>

        <button onClick={logout}>Logout</button>

    
      </div>

    </nav>
  );
}

export default UserNavbar;