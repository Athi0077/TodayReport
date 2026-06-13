import { useState } from "react";

import axios from "axios";

import UserNavbar from "./UserNavbar";

import "./user.css";

function SuggestNews() {

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      image: "",
      newsDate: "",
    });




  const submitNews = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/suggested/add",
        form
      );
      alert(
        "News Suggested Successfully"
      );
      setForm({
        title: "",
        description: "",
        image: "",
        newsDate: "",
      });
    } catch (err) {
      console.log(err);
      alert(err.response?.data || "An error occurred");
    }
  };




  return (
    <div className="user-page">

      <UserNavbar />



      <div className="suggest-container">

        <h1>Suggest News</h1>

        <form onSubmit={submitNews}>

          <input
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />



          <textarea
            placeholder="Description"
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />



          <input
            type="text"
            placeholder="Image URL"
            onChange={(e) =>
              setForm({
                ...form,
                image:
                  e.target.value,
              })
            }
          />



          <input
            type="date"
            onChange={(e) =>
              setForm({
                ...form,
                newsDate:
                  e.target.value,
              })
            }
          />



          <button type="submit">
            Submit News
          </button>

        </form>

      </div>

    </div>
  );
}

export default SuggestNews;