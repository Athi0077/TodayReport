import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import UserNavbar from "./UserNavbar";

import "./user.css";

function NewsDetails() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("adminId");
  const userName = localStorage.getItem("adminName");
  const user = userId ? { _id: userId, name: userName } : null;

  const navigate = useNavigate();
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  // ================= GET SINGLE NEWS =================

  const getSingleNews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/news/${id}`
      );
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= LIKE / UNLIKE FUNCTION =================

  const likeNews = async () => {
    if (!token || !user) {
      return navigate("/login");
    }

    if (likeLoading) return;

    setLikeLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/actions/like/${news._id}`,
        { userId: user._id },
        { headers: { authorization: token } }
      );
      // Backend returns updated news — refresh just this news
      setNews(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLikeLoading(false);
    }
  };

  // ================= SHARE FUNCTION =================

  const shareNews = async () => {
    const shareData = {
      title: news.title,
      text: news.description,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= COMMENT FUNCTION =================

  const openCommentBox = () => {
    if (!token || !user) {
      return navigate("/login");
    }
    setComment("");
    setCommentError("");
    setShowComment(true);
  };

  const addComment = async () => {
    if (!comment.trim()) {
      return setCommentError("Comment cannot be empty.");
    }
    if (comment.length > 100) {
      return setCommentError("Comment must be 100 characters or less.");
    }

    setCommentLoading(true);
    setCommentError("");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/actions/comment/${news._id}`,
        {
          userId: user._id,
          userName: user.name,
          text: comment,
        },
        { headers: { authorization: token } }
      );

      // Backend returns updated news — update state so comment appears immediately
      setNews(res.data);
      setComment("");
      setShowComment(false);
    } catch (error) {
      console.log(error);
      setCommentError("Failed to submit comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  // ================= USE EFFECT =================

  useEffect(() => {
    getSingleNews();
  }, []);

  if (!news) return <h1>Loading...</h1>;

  // Check if current user already liked this news
  const userLiked =
    user && news.likes?.some((likeId) => likeId.toString() === user._id);

  return (
    <div className="user-page">
      <UserNavbar />

      <div className="details-page">
        <img src={news.image} alt={news.title} />

        <h1>{news.title}</h1>

        <h3>{news.newsDate}</h3>

        <p>{news.description}</p>

        <p>
          <b>Reporter Name : {news.adminName}</b>
        </p>

        {/* ACTION BUTTONS */}
        <div className="details-btns">
          <button className="details-btn-home" onClick={() => navigate("/user-home")}>
            🏠 Home
          </button>

          <button
            className={`details-btn-like${userLiked ? " liked" : ""}`}
            onClick={likeNews}
            disabled={likeLoading}
            title={userLiked ? "Unlike" : "Like"}
          >
            {userLiked ? "❤️" : "🤍"} {news.likes?.length || 0}
          </button>

          <button className="details-btn-share" onClick={shareNews}>
            📤 Share
          </button>

          <button className="details-btn-comment" onClick={openCommentBox}>
            💬 {news.comments?.length || 0} Comments
          </button>
        </div>

        {/* COMMENTS LIST */}
        <div className="comments-section">
          <h2>Comments ({news.comments?.length || 0})</h2>

          {news.comments?.length === 0 && (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}

          {news.comments?.map((item, index) => (
            <div key={index} className="comment-box">
              <h4>{item.userName}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        {/* COMMENT POPUP */}
        {showComment && (
          <div className="popup-overlay" onClick={(e) => {
            if (e.target.classList.contains("popup-overlay")) setShowComment(false);
          }}>
            <div className="popup-box">
              <h2>Add Comment</h2>

              <textarea
                placeholder="Write your comment here..."
                value={comment}
                maxLength={100}
                onChange={(e) => {
                  setComment(e.target.value);
                  if (commentError) setCommentError("");
                }}
              />

              <p className="char-count">{comment.length}/100</p>

              {commentError && (
                <p className="comment-error">{commentError}</p>
              )}

              <div className="popup-btns">
                <button
                  className="popup-btn-submit"
                  onClick={addComment}
                  disabled={commentLoading}
                >
                  {commentLoading ? "Submitting..." : "Submit"}
                </button>

                <button
                  className="popup-btn-cancel"
                  onClick={() => setShowComment(false)}
                  disabled={commentLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsDetails;