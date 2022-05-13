import React from "react";
import { Link } from "react-router-dom";
import styles from "./countryActivity.module.css";

export default function SingleCard({ ...pj }) {
  return (
    <div className={styles.container}>
      <div className={styles.containerlink}>
        <div className={styles.cartel}>
          <Link to={`/activity/${pj.id}`} key={pj.id} className={styles.dogApi}>
            {pj.name}{" "}
          </Link>
        </div>

        <img src={pj.image} alt={pj.name} className={styles.image} />
      </div>

      <div className={styles.containerProps}>
        <h4 className={styles.title}>Difficulty: {pj.difficulty} </h4>
        <h4 className={styles.title}>Duration: {pj.duration} min </h4>
        <h4 className={styles.title}>
          Seasons: {pj.season.map((m) => " " + m + " ")}{" "}
        </h4>
        <p className={styles.title}>{pj.info} </p>
      </div>
    </div>
  );
}
