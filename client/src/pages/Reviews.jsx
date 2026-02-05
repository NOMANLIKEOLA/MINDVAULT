import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await api.get("/reviews");
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "1rem" }}>
        <h1>Reviews</h1>

        <ul>
          {reviews.map((r) => (
            <li key={r._id}>
              <strong>{r.decision?.title}</strong>
              <br />
              Outcome: {r.outcomeRating}
              <br />
              Lesson: {r.lessonLearned}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Reviews;
