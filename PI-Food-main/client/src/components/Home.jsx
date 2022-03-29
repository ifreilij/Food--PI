import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paged from "./Paginado";

import styles from "../styles/Home.module.css";

import {
  getRecipes,
  filterByDiet,
  orderByScore,
  orderByAlpha,
} from "../actions/index";

export default function Home() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const allRecipes = useSelector((state) => state.recipes);
  const errors = useSelector((state) => state.errorsNotFound);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);    // 1° pag        |       2° pag
  const firstIndex = recipesPerPage * page - recipesPerPage; // 6 x 1 - 6 = 0  |    6 x 2 - 6 = 6
  const lastIndex = recipesPerPage * page;                  //  6 x 1 = 6      |     6 x 2 = 12

  const paginadoFinal = allRecipes.slice(
                                                             //   del 0 al 5   |    del 6 al 11
    firstIndex,
    lastIndex
  );

  const paginado = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleFiltroByDiet(e) {
    if (e.target.value === "all") dispatch(getRecipes());
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }
  function handleOrderAlpha(e) {
    e.preventDefault();
    dispatch(orderByAlpha(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }
  function handleOrderScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={styles.home}>
      <div className={styles.SearchBar}>
        <SearchBar setTitle={setTitle} title={title} />
      </div>

      <div className={styles.filterC}>
        <Link to="/creacion">
          <button className={styles.btn}>Crea tu receta</button>
        </Link>
        <div>
          <label>Filtrado por dietas:</label>
          <select
            className={styles.select}
            name="diets"
            onChange={(e) => handleFiltroByDiet(e)}
          >
            <option value="all">All</option>
            <option value="gluten free">Gluten Free</option>
            <option value="lacto ovo vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="paleolithic">Paleo</option>
            <option value="primal">Primal</option>
            <option value="fodmap friendly">Low FODMAP</option>
            <option value="whole 30">Whole30</option>
            <option value="dairy free">Dairy Free</option>
          </select>
        </div>

        <div>
          <label>Ordenado alfabético:</label>
          <select
            className={styles.select}
            defaultValue="Elige"
            onChange={(e) => handleOrderAlpha(e)}
          >
            <option disabled> Elige</option>
            <option value="ASC">A - Z </option>
            <option value="DESC">Z - A</option>
          </select>
          <label>Ordenado por puntuacion:</label>
          <select
            defaultValue="Elige"
            className={styles.select}
            onChange={(e) => handleOrderScore(e)}
          >
            <option disabled> Elige</option>
            <option value="ASC">Puntuación ascendente</option>
            <option value="DESC">Puntuación descendente</option>
          </select>
        </div>
      </div>

      <div className={styles.paginado}>
        <Paged
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>

      <div className={styles.cards}>
        {errors.status === "404" || errors.status ? (
          <span className={styles.span}>
            {errors.data + " - " + errors.status}
          </span>
        ) : (
          paginadoFinal?.map((e) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                key={e.id}
                to={"/home/" + e.id}
              >
                <Card
                  key={e.id}
                  title={e.title}
                  image={e.image}
                  dietTypes={e.dietTypes}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
