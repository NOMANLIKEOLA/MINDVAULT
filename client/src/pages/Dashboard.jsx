import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics/dashboard").then((res) => {
      setStats(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Dashboard</h1>

        {loading && <p>Loading analytics...</p>}

        {stats && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <StatCard title="Total Decisions" value={stats.totalDecisions} />
              <StatCard title="Reviewed" value={stats.totalReviews} />
              <StatCard
                title="Unreviewed"
                value={stats.unreviewedDecisions}
              />
            </div>

            <section style={{ marginTop: "3rem" }}>
              <h2>Outcomes</h2>
              <ul>
                {stats.outcomeStats.map((o) => (
                  <li key={o._id}>
                    {o._id.toUpperCase()} : {o.count}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </>
  );
};

const StatCard = ({ title, value }) => (
  <div className="card">
    <p style={{ color: "var(--text-secondary)" }}>{title}</p>
    <h2 style={{ margin: 0 }}>{value}</h2>
  </div>
);

export default Dashboard;
