"use client";
import styles from "./ArticleList.module.css";
import Article from "./Article.jsx";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../articles/page";
import Loading from "../loading/Loading";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { page } = useContext(Context);

  useEffect(() => {
    async function fetchArticles() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/gamespot/articles?page=${page}&limit=24`
      );
      console.log(response.data.articles);
      setArticles([...response.data.articles]);
      setLoading(false);
    }
    fetchArticles();
  }, [page]);
  return (
    <div className={styles["article-list"]}>
      {loading ? (
        <Loading />
      ) : (
        articles.map((article, idx) => <Article post={article} key={idx} />)
      )}
    </div>
  );
}

export default ArticleList;
