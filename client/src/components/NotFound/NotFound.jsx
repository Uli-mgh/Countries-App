import React from "react";
import { Link } from "react-router-dom";
import styles from "./notFound.module.css";
export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.notfound}>
        <h1 className={styles.text}>
          <span>404:</span> Not found :😢
        </h1>
        <div className={styles.homelink}>
          <Link to="/home" className={styles.link}>
            <h2>Back to /home</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
