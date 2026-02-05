import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Decisions = () => {
  const [decisions, setDecisions] = useState([]);
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState(5);

  const fetchDecisions = async () => {
    const res = await api.get("/decisions");
    setDecisions(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDecisions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/decisions", {
      title,
      context,
      options: ["Option A", "Option B"],
      decisionTaken: "Option A",
      confidenceLevel,
    });

    setTitle("");
    setContext("");
    setConfidenceLevel(5);
    fetchDecisions();
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "1rem" }}>
        <h1>Decisions</h1>

        <form onSubmit={handleSubmit}>
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
          />

          <input
            type="number"
            min="1"
            max="10"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(Number(e.target.value))}
          />

          <button>Add Decision</button>
        </form>

        <ul>
          {decisions.map((d) => (
            <li key={d._id}>
              <strong>{d.title}</strong> — confidence {d.confidenceLevel}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Decisions;
