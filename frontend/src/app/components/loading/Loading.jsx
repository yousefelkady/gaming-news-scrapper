import React from "react";
import styles from "./loading.module.css";
export default function Loading() {
  return (
    <div className={styles['loading-container']}>
      <div className={styles.loader}></div>
    </div>
  );
}
