import React from "react";

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// Actions
import {
  byActivity,
  byContinent,
  byIndependence,
  byName,
  byPopulation,
  bySeason,
} from "../../redux/actions";

import styles from "./filters.module.css";

export default function Filters() {
  const activities = useSelector((state) => state.activities);
  const countries = useSelector((state) => state.allCountries);

  const continentes = countries.map((c) => c.continents);
  const continentsList = continentes.filter(
    (el, index) => continentes.indexOf(el) === index
  );

  const activityList = activities.map((e) => e.name);

  const dispatch = useDispatch();

  const population = (e) => {
    console.log(e.target.value);
    dispatch(byPopulation(e.target.value));
  };

  const Seasons = (e) => {
    console.log(e.target.value);
    dispatch(bySeason(e.target.value));
  };

  const porActividad = (e) => {
    console.log(e.target.value);

    dispatch(byActivity(e.target.value));
  };
  const byIndependency = (e) => {
    console.log(e.target.value);

    dispatch(byIndependence(e.target.value));
  };

  const porContinente = (e) => {
    console.log(e.target.value);

    dispatch(byContinent(e.target.value));
  };

  const nameSort = (e) => {
    console.log(e.target.value);

    dispatch(byName(e.target.value));
  };

  return (
    <div className={styles.container}>
      <div>
        <label>ABC</label>
        <select onChange={nameSort}>
          <option value="all">All</option>
          <option value="A"> A to Z</option>
          <option value="Z"> Z to A</option>
        </select>
      </div>

      <div>
        <label>Season</label>
        <select onChange={Seasons}>
          <option value="all">All Seasons</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
      </div>

      <div>
        <label>Activity</label>
        <select onChange={porActividad}>
          <option value="all">All Activities</option>
          {activityList?.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label>Independent</label>
        <select onChange={byIndependency}>
          <option value="all">All</option>
          <option value="true">Independent</option>
          <option value="false">Dependent</option>
        </select>
      </div>

      <div>
        <label>Continents</label>
        <select onChange={porContinente}>
          <option value="all">All</option>
          {continentsList?.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label>Population</label>
        <select onChange={population}>
          <option value="all">All</option>
          <option value="A">Ascendent</option>
          <option value="Z">Descendent</option>
        </select>
      </div>
    </div>
  );
}
