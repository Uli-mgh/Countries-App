import React from "react";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { req_activities, req_countries } from "../../redux/actions";

// Dependencias
import { useNavigate } from "react-router";
//Components
import SearchBar from "../Searchbar/SearchBar.jsx";
import Cards from "../Cards/Cards.jsx";
import styles from "./home.module.css";

function Home() {
  const countries = useSelector((state) => state.filteredCountries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(req_countries());
    dispatch(req_activities());
  }, [dispatch, navigate]);

  return (
    <div className={styles.container}>
      <SearchBar />

      <div className={styles.container}>
        <Cards countries={countries} />
      </div>
    </div>
  );
}

export default Home;
