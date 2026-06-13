import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "./Navbar";
import "./suggestednews.css";

function SuggestedNews() {

  const [suggested, setSuggested] =
    useState([]);

  const getSuggestedNews = async () => {

    const res = await axios.get(
      "https://todayreport-1.onrender.com/api/suggested"
    );

    setSuggested(res.data);
  };

  useEffect(() => {
    getSuggestedNews();
  }, []);




  // APPROVE NEWS
  const approveNews = async (news) => {

    try {
      // Remove _id and other mongodb fields to create a fresh News document
      // eslint-disable-next-line no-unused-vars
      const { _id, __v, createdAt, updatedAt, ...newsData } = news;

      // add to real news collection
      await axios.post(
        "https://todayreport-1.onrender.com/api/news/add",
        newsData,
        {
          headers: {
            authorization:
              localStorage.getItem("token"),
          },
        }
      );

      // remove from suggested news collection
      await axios.delete(
        `https://todayreport-1.onrender.com/api/suggested/${_id}`
      );

      // update UI
      setSuggested(suggested.filter((item) => item._id !== _id));

      alert("Approved");

    } catch (err) {
      console.log(err);
    }
  };




  return (
    <div className="suggested-page">

      <Navbar />

      <h1>Suggested News</h1>

      {suggested.length === 0 ? (
        <p className="suggested-empty">No suggested news to review.</p>
      ) : (
        <div className="suggested-grid">
          {suggested.map((item) => (
            <div className="suggested-card" key={item._id}>

              <span className="suggested-badge">Suggestion</span>

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <span className="suggested-date">{item.newsDate}</span>

              <button
                className="approve-btn"
                onClick={() => approveNews(item)}
              >
                ✓ Approve
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SuggestedNews;