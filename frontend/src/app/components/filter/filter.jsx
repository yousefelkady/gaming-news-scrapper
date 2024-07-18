import React from "react";
import styles from "./filter.module.css";
import { useState } from "react";
export default function filter() {
  const [searchTerm, setSearchTerm] = useState("");
  const search = () => {
    console.log(searchTerm);
  };

  return (
    <div className={styles.filter}>
      <input
        type="text"
        className={styles.search}
        placeholder={"Search for Articles"}
      />
      <select className={styles.select}>
        <option value="gamespot">Gamespot</option>
        <option value="eurogamer">EuroGamer</option>
      </select>
      <button className={styles.btn} onClick={search}>
        Search
      </button>
    </div>
  );
}
