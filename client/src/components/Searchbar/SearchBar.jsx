import React from "react";
import { useState } from "react";

// Redux & actions
import { useDispatch } from "react-redux";
import { countryName } from "../../redux/actions";

// Component
import Filters from "../Filtros/Filters";
import styles from "./searchbar.module.css";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Despacho la action para buscar por query.
    dispatch(countryName(name));
    setName("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtros}>
        <Filters />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.inputSearch}
          value={name}
          onChange={handleOnChange}
          placeholder="Search country"
        />
        <input className={styles.inputBtn} type="submit" value="Go!" />
      </form>
    </div>
  );
}
