import { Link, useNavigate } from "react-router-dom";
import { logoutUser, getUser } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/decisions">Decisions</Link>
      <Link to="/reviews">Reviews</Link>

      <div style={{ marginLeft: "auto" }}>
        {user && <span>{user.name}</span>}
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
