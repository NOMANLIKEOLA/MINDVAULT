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
    <nav
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >           
      <div
        className="container"         
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <strong style={{ fontSize: "1.1rem" }}>MindVault</strong>

        <Link to="/">Dashboard</Link>
        <Link to="/decisions">Decisions</Link>
        <Link to="/reviews">Reviews</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
          <span style={{ color: "var(--text-secondary)" }}>
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            style={{ background: "var(--danger)" }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
