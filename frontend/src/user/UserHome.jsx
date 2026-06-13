import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import "./user.css";

function UserHome() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Sports", "Health", "Politics", "Education", "Technology", "Entertainment", "General"];




  // GET NEWS
  const getNews = async () => {

    const res = await axios.get(
      "https://todayreport-1.onrender.com/api/news"
    );

    setNews(res.data);
  };




  useEffect(() => {
    getNews();
  }, []);




  // Today's headlines for ticker
  const todayHeadlines = news.filter(
    (item) => item.newsDate === today
  );


  // FILTER
  const filteredNews = news.filter(
    (item) => {

      const searchMatch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const dateMatch =
        date === ""
          ? true
          : item.newsDate === date;

      const categoryMatch =
        selectedCategory === "All"
          ? true
          : item.category === selectedCategory;

      return searchMatch && dateMatch && categoryMatch;
    }
  );




  return (
    <div className="user-page" style={{ overflowX: "hidden" }}>

      <UserNavbar />

      {/* CATEGORY BAR */}
      <div className="category-bar">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="filter-section">

          <input
            type="text"
            placeholder="Search News"
            onChange={(e) =>
              setSearch(e.target.value)} />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

        </div>

      </div>

      {/* SCROLLING HEADLINES TICKER */}
      {todayHeadlines.length > 0 && (
        <div className="headline-ticker">
          <div className="ticker-label">
            <span className="ticker-dot">⊙</span> Headlines
          </div>
          <div className="ticker-wrapper">
            <div className="ticker-content">
              {todayHeadlines.map((item, index) => (
                <span
                  className="ticker-item"
                  key={item._id}
                  onClick={() => navigate(`/news/${item._id}`)}
                >
                  {item.title}
                  {index < todayHeadlines.length - 1 && (
                    <span className="ticker-separator">|</span>
                  )}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {todayHeadlines.map((item, index) => (
                <span
                  className="ticker-item"
                  key={`dup-${item._id}`}
                  onClick={() => navigate(`/news/${item._id}`)}
                >
                  {item.title}
                  {index < todayHeadlines.length - 1 && (
                    <span className="ticker-separator">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* TOP FILTER */}




      {/* NEWS */}
      <div className="user-news-grid">

        {filteredNews.map((item) => (

          <div
            className="user-news-card"
            key={item._id}
          >

            <img
              src={item.image}
              alt=""
            />

            <div className="user-news-content">

              <h2>{item.title}</h2>

              <p>
                {item.description.slice(
                  0,
                  100
                )}
                ...
              </p>
              <h3>Repoter Name : {item.adminName}</h3>

              <button
                onClick={() =>
                  navigate(
                    `/news/${item._id}`
                  )
                }
              >
                Read More
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default UserHome;