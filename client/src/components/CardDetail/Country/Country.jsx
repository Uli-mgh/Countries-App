import React from "react";
import styles from "./country.module.css";
import CountryActivity from "./CountryActivity/CountryActivity";

function Country({ ...country }) {
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.h1Name}>{country.name} </h1>
        <img src={country.flag} alt={country.name} className={styles.img} />
        <h1 className={styles.h1Desc}>
          Id: <span>{country.id}</span>
        </h1>
        <h1 className={styles.h1Desc}>Name Common: {country.nameCommon}</h1>
        <h1 className={styles.h1Desc}>Capital: {country.capital} </h1>
        <h1 className={styles.h1Desc}>Area: {country.area} km2</h1>
        <h1 className={styles.h1Desc}>Population: {country.population}</h1>
        <h1 className={styles.h1Desc}>Capital: {country.capital} </h1>
        <h1 className={styles.h1Desc}>Continent: {country.continents} </h1>
        <h1 className={styles.h1Desc}>Languajes: {country.languages} </h1>
        <h1 className={styles.h1Desc}>Currencies: {country.currencies}</h1>
        <h1 className={styles.h1Desc}>
          Independent:{" "}
          {country.independent === true ? "INDEPENDIENTE" : "DEPENDIENTE"}{" "}
        </h1>
      </div>

      <div className={styles.container}>
        {country.activities?.map((e, index) => {
          return (
            <div key={index}>
              <CountryActivity {...e} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Country;
