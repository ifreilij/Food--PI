import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDietTypes, addRecipe } from "../actions/index";
import style from "../styles/Form.module.css"

function validation(input) {
  const regex = /^[A-Za-z]+(.*)+$/;
  const errors = {};
  if (!input.title) errors.title = "Debes introducir un titulo";
  else if (!regex.test(input.title)) errors.title = "Solamente letras";

  if (!input.summary) errors.summary = "Debes introducir un comentario";
  else if (!regex.test(input.summary)) errors.summary = "Solamente letras";

  if (!input.spoonacularScore < 0 || input.spoonacularScore > 100)
    errors.spoonacularScore = "Must be a number between 1 and 100";

  if (input.healthScore < 0 || input.healthScore > 100)
    errors.healthScore = "Must be a number between 1 and 100";

  if (!input.analyzedInstructions.length)
    errors.analyzedInstructions = "Debes introducir alguna instrucción";
  else if (!regex.test(input.analyzedInstructions))
    errors.analyzedInstructions = "Solamente letras";

  if (!input.dietTypes.length)
    errors.dietTypes = "Debes elegir, aunque sea, una dieta";
  return errors;
}

export default function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dietTypes = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    analyzedInstructions: "",
    dietTypes: [],
  });

  useEffect(() => {
    dispatch(getDietTypes());
  }, [dispatch]);

  function handleOnChange(e) {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      const validacion = validation(newInput);
      setErrors(validacion);
      return newInput;
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      dietTypes: [...input.dietTypes, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.title ||
      !input.summary ||
      !input.healthScore ||
      !input.analyzedInstructions ||
      !input.spoonacularScore ||
      !input.dietTypes
    ) {
      alert("Debes llenar todo");
    } else {
      dispatch(addRecipe(input));
      alert("Se ha creado la nueva receta");
      setInput({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        analyzedInstructions: "",
        dietTypes: [],
      });
      navigate("/home");
    }
  }

  function handleOnDelete(e) {
    console.log("funcion delete", e);

    setInput({
      ...input,
      dietTypes: input.dietTypes.filter((diet) => diet !== e),
    });
  }
  return (
    <div className={style.bkg}>
      <h1 className={style.text}>Crea tu receta </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className={style.text}>Titulo</label>
          <input className={style.input}
            type="text"
            name="title"
            value={input.title}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.title && <p className={style.error}> {errors.title}</p>}
        </div>
       
        <br></br>
        <div>
          <label className={style.text}>Resumen</label>
          <input className={style.input}
            type="text"
            name="summary"
            value={input.summary}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.summary && <p className={style.error}> {errors.summary}</p>}
        </div>
     
        <br></br>
        <div>
          <label className={style.text}>Puntuación</label>
          <input className={style.input}
            type="number"
            name="spoonacularScore"
            value={input.spoonacularScore}
            placeholder="Del 1 al 100"
            onChange={(e) => handleOnChange(e)}
          />
          {errors.spoonacularScore && <p className={style.error}> {errors.spoonacularScore}</p>}
        </div>
      
        <br></br>
        <div>
          <label className={style.text}>Salubridad</label>
          <input  className={style.input}
            type="number"
            name="healthScore"
            value={input.healthScore}
            placeholder="Del 1 al 100"
            onChange={(e) => handleOnChange(e)}
          />
          {errors.healthScore && <p className={style.error}> {errors.healthScore}</p>}
        </div>
      
        <br></br>
        <div>
          <label className={style.text}>Paso a paso</label>
          <input className={style.input}
            type="text"
            name="analyzedInstructions"
            value={input.analyzedInstructions}
            onChange={(e) => handleOnChange(e)}
          />
          {errors.analyzedInstructions && <p className={style.error}> {errors.analyzedInstructions}</p>}
        </div>

       
        <br></br>
       
        <div>
        <label className={style.text}>Dietas</label>
          <select className={style.select} onChange={(e) => handleSelect(e)}>
            {dietTypes?.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
          {errors.dietTypes && <p className={style.error}> {errors.dietTypes}</p>}
        </div>
        <div>
          <div>
            <ul>
              {input.dietTypes?.map((el) => {
                return (
                  <li  className={style.li} key={el} onClick={() => handleOnDelete(el)}>
                    {el}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <input className={style.btn} type="submit" />
        </div>
      </form>
      <br></br>
      <Link to="/home">
        <button className={style.btn}>Volver al home</button>
      </Link>
    </div>
  );
}
