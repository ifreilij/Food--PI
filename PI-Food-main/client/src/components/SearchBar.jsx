import React from "react";

import { useDispatch } from "react-redux";
import { getRecipes, getInput, resetErrors } from "../actions/index";
import styles from "../styles/SearchBar.module.css";
export default function SearchBar({ title, setTitle }) {
  const dispatch = useDispatch();

  function handleInputChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getInput(title));
    setTitle("");
  }
  function handleReset(e) {
    e.preventDefault();
    dispatch(resetErrors());
    dispatch(getRecipes());
  }
  console.log(title);
  return (
    <div className={styles.SearchBar}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
        className={styles.input}
          type="text"
          value={title.title}
          placeholder="Buscar receta"
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit" className={styles.btn}>
          Buscar
        </button>
      </form>
      <button className={styles.btn} onClick={(e) => handleReset(e)}>
        Reset
      </button>
    </div>
  );
}
