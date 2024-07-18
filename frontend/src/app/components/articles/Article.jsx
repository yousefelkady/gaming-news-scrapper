"use client";
import styles from "./Article.module.css";
import Image from "next/image";

function Article({ post }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          quality={100}
          className={styles.image}
        />
      </div>
      <p className={styles.source}>{post.source}</p>
      <h3 className={styles.title}>{post.title}</h3>
      <div className={styles.tags}>
        <button className={styles.tag}>PC</button>
        <button className={styles.tag}>Roleplaying</button>
      </div>
    </div>
  );
}

export default Article;
