import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import styles from "../styles/Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.detail);

  return (
    <div>
      {
        <div className={styles.details}>
          <Link to="/home">
            <button className="ButtonVolver">Volver</button>
          </Link>

          <h2 className={styles.title}>{details.title}</h2>
          <div className={styles.imgDiet}>
            <img
              className={styles.img}
              src={details.image}
              alt="Not found"
            />

            <h4 className={styles.text}>
              Tipo de dieta:
              {details.diets?.map((e) => {
                return <p key={e.name}> {e.name}</p>;
              }) ||
                details.dietTypes?.map((e) => {
                  return <p key={e}> {e}</p>;
                })}
            </h4>

            <h4 className={styles.text}>Salubridad: {details.healthScore}</h4>
            <h5 className={styles.text}>
              Puntuación: {details.spoonacularScore}
            </h5>
          </div>

          <h4 className={styles.text}>
            Resumen: <br></br>
            {details.summary?.replace(/<[^>]*>/g, "")}{" "}
          </h4>
          <br></br>
          <br></br>
         <div className={styles.steps} >
          <h5 className={styles.text}>
            Paso a paso:
            <ul >
              {Array.isArray(details.analyzedInstructions) ? (
                details.analyzedInstructions.map((e) => {
                  return <li  key={e.number}>{e.step}</li>;
                })
              ) : (
                <h3> {details.analyzedInstructions}</h3>
              )}
            </ul>
          </h5>
          </div>
        </div>
      }
    </div>
  );
}
