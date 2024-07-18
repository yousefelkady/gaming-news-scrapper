"use client";
import React from "react";
import { useState, Suspense } from "react";
import ArticleList from "../components/articles/ArticleList";
import Pagination from "../components/pagination/pagination";
import Loading from "../components/loading/Loading";
import Filter from "../components/filter/Filter";

export const Context = React.createContext();

export default function Articles() {
  const [page, setPage] = useState(1);

  return (
    <Context.Provider value={{ page, setPage }}>
      <Filter/>
      <Suspense fallback={<Loading/>}>
        <ArticleList />
      </Suspense>
      <Pagination />
    </Context.Provider>
  );
}
