import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "./Navbar";

import "./admin.css";

import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [news, setNews] = useState([]);

  const [latestNews, setLatestNews] =
    useState([]);

  const [suggestedNews, setSuggestedNews] =
    useState([]);


  //get news
  const getNews = async () => {
    const adminId = localStorage.getItem("adminId");
    const res = await axios.get(
      `https://todayreport-1.onrender.com/api/news?adminId=${adminId}`
    );
    setNews(res.data);
  };

  // GET LATEST NEWS
  const getLatestNews = async () => {
    const adminId = localStorage.getItem("adminId");
    const res = await axios.get(
      `https://todayreport-1.onrender.com/api/news?adminId=${adminId}`
    );

    setLatestNews(res.data.slice(0, 5));
  };




  // GET SUGGESTED NEWS
  const getSuggestedNews = async () => {

    const res = await axios.get(
      "https://todayreport-1.onrender.com/api/suggested"
    );

    setSuggestedNews(res.data.slice(0, 5));
  };




  useEffect(() => {

    getNews();

    getLatestNews();

    getSuggestedNews();

  }, []);


  return (
    <div className="home">

      <Navbar />

      <div className="dashboard">

        <h1>
          Good Morning, {localStorage.getItem("adminName") || "Admin"} 👋
        </h1>

        <p>
          Here’s what’s happening with
          TodayReport today.
        </p>


        {/* TOP CARDS */}
        <div className="top-cards">

          <div className="card-box">
            <h2>Total News</h2>

            <h1>{news.length}</h1>
          </div>


          <div className="card-box">
            <h2>Suggested News</h2>

            <h1>{suggestedNews.length}</h1>
          </div>

        </div>


        {/* BOTTOM SECTION */}
        <div className="bottom-section">

          {/* RECENT NEWS */}
          <div className="recent-box">
            <h2>
              Latest News
              <a onClick={() => navigate("/news-list")} className="viewallbtn">View All</a>
            </h2>

            {latestNews.map((item) => (
              <div
                className="news-item"
                key={item._id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.newsDate}</p>
                </div>

                <button onClick={() => navigate("/news-list")} className="live-btn">
                  LIVE
                </button>

              </div>
            ))}

          </div>

          {/* SUGGESTED NEWS */}
          <div className="recent-box">

            <h2>
              Suggested News
              <a onClick={() => navigate("/suggested-news")} className="viewallbtn">View All</a>
            </h2>

            {suggestedNews.map((item) => (
              <div
                className="news-item"
                key={item._id}>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.newsDate}</p>
                </div>

                <button className="pending-btn">
                  Pending
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;