import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  return (
    <div className={styles.containerGlobal}>
      <div>
        <Link to="/" className={styles.linkBarra}>
          <span>Uli mgh</span>
        </Link>
      </div>

      <div className={styles.containerHome}>
        <>
          <Link to="/home" className={styles.link}>
            Home
          </Link>

          <Link to="/create" className={styles.link}>
            New Activity
          </Link>
        </>
      </div>
    </div>
  );
}

export default Navbar;
