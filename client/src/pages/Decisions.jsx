import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Decisions = () => {
  const [decisions, setDecisions] = useState([]);
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [confidence, setConfidence] = useState(5);

  const loadDecisions = async () => {
    const res = await api.get("/decisions");
    setDecisions(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDecisions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/decisions", {
      title,
      context,
      options: ["Option A", "Option B"],
      decisionTaken: "Option A",
      confidenceLevel: confidence,
    });

    setTitle("");
    setContext("");
    setConfidence(5);
    loadDecisions();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Decisions</h1>

        <form className="card" onSubmit={handleSubmit}>
          <input
            placeholder="Decision title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            required
            style={{ marginTop: "1rem" }}
          />

          <input
            type="number"
            min="1"
            max="10"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            style={{ marginTop: "1rem" }}
          />

          <button style={{ marginTop: "1.5rem" }}>
            Add Decision
          </button>
        </form>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
          {decisions.map((d) => (
            <li key={d._id} className="card" style={{ marginBottom: "1rem" }}>
              <strong>{d.title}</strong>
              <p style={{ color: "var(--text-secondary)" }}>
                Confidence {d.confidenceLevel}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Decisions;
