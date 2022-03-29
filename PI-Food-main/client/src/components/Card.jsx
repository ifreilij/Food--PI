import React from "react";
import styles from "../styles/Card.module.css"
export default function Card({ title, image, dietTypes}) {

 
  return (
    <div className={styles.card}>
  
      <h3>{title}</h3>
      <img  className={styles.img} src={image} alt="Esta receta no tiene imagen" />
      <h5>Dieta: {dietTypes}</h5>
    
    </div>
  );
}
