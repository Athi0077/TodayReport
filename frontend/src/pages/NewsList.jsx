import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "./Navbar";

import "./newslist.css";

function NewsList() {

  //search state
  const [search, setSearch] = useState("");

  // MODAL
  const [showModal, setShowModal] =
    useState(false);

  // EDIT MODE
  const [isEdit, setIsEdit] =
    useState(false);

  // FORM STATE
  const [newsForm, setNewsForm] =
    useState({
      _id: "",
      title: "",
      description: "",
      category: "",
      image: "",
      newsDate: "",
    });

  // NEWS DATA
  const [news, setNews] = useState([]);




  // GET ALL NEWS
  const getNews = async () => {

    try {
      const adminId = localStorage.getItem("adminId");
      const url = adminId
        ? `https://todayreport-1.onrender.com/api/news?adminId=${adminId}`
        : "https://todayreport-1.onrender.com/api/news";

      const res = await axios.get(url);

      setNews(res.data);

    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => {
    getNews();
  }, []);





  // ADD OR UPDATE NEWS
  const addNews = async (e) => {

    e.preventDefault();

    try {

      // UPDATE
      if (isEdit) {

        await axios.put(
          `https://todayreport-1.onrender.com/api/news/${newsForm._id}`,
          newsForm,
          {
            headers: {
              authorization:
                localStorage.getItem("token"),
            },
          }
        );

        alert("News Updated");
      }

      // ADD
      else {
        // Exclude _id when creating to prevent Mongoose CastError
        const { _id, ...newsData } = newsForm;

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

        alert("News Added");
      }






      // RESET FORM
      setNewsForm({
        _id: "",
        title: "",
        description: "",
        category: "",
        image: "",
        newsDate: "",
      });

      setIsEdit(false);

      setShowModal(false);

      getNews();

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data || "An error occurred");
    }
  };





  // DELETE NEWS
  const deleteNews = async (id) => {

    try {

      await axios.delete(
        `https://todayreport-1.onrender.com/api/news/${id}`,
        {
          headers: {
            authorization:
              localStorage.getItem("token"),
          },
        }
      );

      alert("News Deleted");

      getNews();

    } catch (err) {
      console.log(err);
    }
  };





  // EDIT NEWS
  const updateNews = (item) => {

    setIsEdit(true);

    setShowModal(true);

    setNewsForm({
      _id: item._id,

      title: item.title,

      description: item.description,

      category: item.category,

      image: item.image,

      newsDate: item.newsDate,
    });
  };





  // OPEN ADD MODAL
  const openAddModal = () => {

    setIsEdit(false);

    setNewsForm({
      _id: "",
      title: "",
      description: "",
      category: "",
      image: "",
      newsDate: "",
    });

    setShowModal(true);
  };





  return (
    <div className="news-page">

      <Navbar />

      {/* search */}


      {/* TOP SECTION */}
      <div className="top-section">

        <h1 >News Management</h1>
        <div className="news-search">
          <input
            type="text"
            placeholder="Search news"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="add-news-btn"
          onClick={openAddModal}
        >
          + Add News
        </button>

      </div>





      {/* NEWS TABLE */}
      <div className="news-table-wrapper">
        <table className="news-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news
              .filter(
                (item) =>
                  item.title.toLowerCase().includes(search.toLowerCase()) ||
                  item.description.toLowerCase().includes(search.toLowerCase()) ||
                  item.category.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      className="table-thumb"
                      src={item.image}
                      alt=""
                    />
                  </td>
                  <td className="td-title">{item.title}</td>
                  <td className="td-desc">{item.description.slice(0, 70)}</td>
                  <td>
                    <span className="category-chip">{item.category}</span>
                  </td>
                  <td className="td-date">{item.newsDate}</td>
                  <td>
                    <div className="table-btns">
                      <button
                        className="edit-btn"
                        onClick={() => updateNews(item)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteNews(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>





      {/* MODAL */}
      {showModal && (

        <div className="modal-overlay">

          <div className="modal-box">

            {/* MODAL TOP */}
            <div className="modal-top">

              <h1>
                {isEdit
                  ? "Update News"
                  : "Add News"}
              </h1>

              <button
                className="close-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                X
              </button>

            </div>




            {/* FORM */}
            <form
              className="news-form"
              onSubmit={addNews}
            >

              {/* TITLE */}
              <input
                type="text"
                placeholder="Title"

                value={newsForm.title}

                onChange={(e) =>
                  setNewsForm({
                    ...newsForm,
                    title: e.target.value,
                  })
                }
              />


              {/* CATEGORY */}
              <select
                value={newsForm.category}
                onChange={(e) =>
                  setNewsForm({
                    ...newsForm,
                    category:
                      e.target.value,
                  })
                }
              >
                <option value="">Select Category</option>
                <option value="Sports">Sports</option>
                <option value="Health">Health</option>
                <option value="Politics">Politics</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Technology">Technology</option>
                <option value="General">General</option>
              </select>


              {/* DESCRIPTION */}
              <textarea
                placeholder="Description"

                value={newsForm.description}

                onChange={(e) =>
                  setNewsForm({
                    ...newsForm,
                    description:
                      e.target.value,
                  })
                }
              />


              {/* IMAGE */}
              <input
                type="text"
                placeholder="Image URL"

                value={newsForm.image}

                onChange={(e) =>
                  setNewsForm({
                    ...newsForm,
                    image:
                      e.target.value,
                  })
                }
              />


              {/* DATE */}
              <input
                type="date"

                value={newsForm.newsDate}

                onChange={(e) =>
                  setNewsForm({
                    ...newsForm,
                    newsDate:
                      e.target.value,
                  })
                }
              />


              {/* BUTTON */}
              <button type="submit">

                {isEdit
                  ? "Update News"
                  : "Add News"}

              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsList; 