import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css"


export default function Landing() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.text}>Bienvenidos</h1>
      <Link to="/home">
        <button className={styles.btn} >Home</button>
      </Link>
    </div>
  );
}
