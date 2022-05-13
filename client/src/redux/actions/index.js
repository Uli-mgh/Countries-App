import axios from "axios";
import {
  CONTINENT,
  GETACTIVITY,
  GETONE,
  GET_COUNTRY_NAME,
  GET_ALL_COUNTRY,
  INDEPENDENT,
  ORDER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  SEASON,
} from "../../constants";

const GET_COUNTRIES = "http://localhost:3001/countries";
// const GET_COUNTRY = "http://localhost:3001/countries/:id";
const GET_ACTIVITIES = "http://localhost:3001/activities";

export function req_countries() {
  // Llamo al servidor con axios
  return async function (dispatch) {
    const request = await axios.get(GET_COUNTRIES);
    console.log(request);

    dispatch({
      type: GET_ALL_COUNTRY,
      payload: request.data,
    });
  };
}

export function req_activities() {
  console.log("actions obtener actividades");
  return async function (dispatch) {
    const request = await axios.get(GET_ACTIVITIES);
    console.log(request);

    dispatch({
      type: GETACTIVITY,
      payload: request.data,
    });
  };
}

export const getCountryDetail = (payload) => {
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:3001/countries/${payload}`
    );
    return dispatch({
      type: GETONE,
      payload: response.data[0],
    });
  };
};

export function byName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function byPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function byActivity(payload) {
  return {
    type: ORDER_BY_ACTIVITY,
    payload,
  };
}

export function bySeason(season) {
  console.log(season);

  return {
    type: SEASON,
    payload: season,
  };
}

export function byContinent(season) {
  console.log(season);
  return {
    type: CONTINENT,
    payload: season,
  };
}

export function byIndependence(season) {
  return {
    type: INDEPENDENT,
    payload: season,
  };
}

export function countryName(name) {
  // El nombre por searchbar
  console.log(name);
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      console.log(json.data);

      return dispatch({
        type: GET_COUNTRY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
