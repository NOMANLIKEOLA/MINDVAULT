import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/analytics/dashboard").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Decisions: {stats.totalDecisions}</p>
      <p>Reviewed: {stats.totalReviews}</p>
      <p>Unreviewed: {stats.unreviewedDecisions}</p>
    </div>
  );
};

export default Dashboard;
