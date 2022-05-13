import React from "react";

import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div className={styles.containerGlobal}>
      <div className={styles.container}>
        <div className={styles.linkDiv}></div>
        <h2 className={styles.title}>
          Discover new <span className={styles.span}>places!</span>
        </h2>

        <h3 className={styles.subtitle}>
          Search and travel arraound all the Countries
        </h3>

        <div className={styles.innerContainer}>
          <Link to="/home" className={styles.link}>
            <h3>View all Countries</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
