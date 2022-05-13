import React from "react";
import styles from "./card.module.css";

import { Link } from "react-router-dom";

function Card({ ...p }) {
  return (
    <div className={styles.cardContainer}>
      <div>
        <div className={styles.inner}>
          {typeof p.id === "number" ? (
            <h2 className={styles.apiCard}>API</h2>
          ) : (
            <h2 className={styles.dbCard}>DB</h2>
          )}
          {/* Si el id de la card no viene como Number es porque viene de la DB */}
        </div>

        <Link to={`/cardDetail/${p.id}`} key={p.id} className={styles.link}>
          {p.nameCommon}
        </Link>

        <img src={p.flag} alt={p.nameCommon} className={styles.img} />

        <h4 className={styles.h4}>Continent: {p.continents}</h4>
      </div>
    </div>
  );
}

export default Card;
