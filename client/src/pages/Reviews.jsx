import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Reviews</h1>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
          {reviews.map((r) => (
            <li key={r._id} className="card" style={{ marginBottom: "1rem" }}>
              <strong>{r.decision?.title}</strong>
              <p>Outcome: {r.outcomeRating}</p>
              <p style={{ color: "var(--text-secondary)" }}>
                {r.lessonLearned}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Reviews;
