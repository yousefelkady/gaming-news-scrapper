"use client";
import React from "react";
import styles from "./pagination.module.css";
import { useState, useContext } from "react";
import { Context } from "../../articles/page";

export default function Pagination() {
  const { page, setPage } = useContext(Context);
  function prevPage() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }
  function nextPage() {
    setPage(page + 1);
  }
  const hasPrev = page == 1;
  return (
    <div className={styles["pagination-container"]}>
      <button
        className={styles["pagination-btn"]}
        onClick={prevPage}
        style={{
          cursor: !hasPrev ? "pointer" : null,
          opacity: hasPrev ? 0.22 : 1,
        }}
      >
        Previous
      </button>
      <button
        className={styles["pagination-btn"]}
        style={{
            cursor: "pointer",
        }}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
}
