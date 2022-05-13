import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./cardDetail.module.css";

import Country from "./Country/Country";
import { getCountryDetail } from "../../redux/actions";

export default function CardDetail() {
  const activities = useSelector((state) => state.activities);

  // const [country, setCountry] = useState();

  let dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();

  let country = "";

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);

  country = useSelector((state) => state.country);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/countries/${id}`)
  //     .then((response) => {
  //       setCountry(response.data[0]);
  //     })
  //     .catch((error) => console.log(error));
  // }, [id]);

  return (
    <div className={styles.container}>
      <Country {...country} />
    </div>
  );
}
