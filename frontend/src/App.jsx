import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import NewsList from "./pages/NewsList";
import SuggestedNews from "./pages/SuggestedNews";
import UserHome from "./user/UserHome";
import NewsDetails from "./user/NewsDetails";
import SuggestNews from "./user/SuggestNews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/news-list" element={<NewsList />} />
        <Route path="/suggested-news" element={<SuggestedNews />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/suggest-news" element={<SuggestNews />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;