import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { req_activities } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import styles from "./form.module.css";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    info: "",
    duration: "",
    image: "",
    season: [],
    countries: [],
  });

  // Guardo la actividad pasada por body a la DB

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "seasons") {
      setActivity({
        ...activity,
        season: [...activity.season, e.target.value],
      });
    }

    if (e.target.name === "name") {
      setActivity({
        ...activity,
        [e.target.name]: e.target.value,
      });
    }

    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
    });
  };

  // 2 handlers para los select
  const handleSelectSeason = (e) => {
    e.preventDefault();

    setActivity({
      ...activity,
      season: [...activity.season, e.target.value],
    });
  };

  const handleSelect = (e) => {
    e.preventDefault();

    setActivity({
      ...activity,
      countries: [...activity.countries, e.target.value],
    });
  };

  const onClickDelete = (e) => {
    setActivity({
      ...activity,
      season: activity.season.filter((el) => el !== e),
    });
  };

  const onClickDeleteCountry = (e) => {
    setActivity({
      ...activity,
      countries: activity.countries.filter((el) => el !== e),
    });
  };

  const activityInCountry = countries?.filter((e) =>
    activity.countries.includes(e.id)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/activities", activity);
    // console.log(request);
    alert(`The activity: ${activity} was successfully stored`);
    setActivity({
      name: "",
      difficulty: "",
      info: "",
      duration: "",
      image: "",
      season: [],
      countries: [],
    });
    navigate("/home");
  };

  useEffect(() => {
    dispatch(req_activities());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.containerForm}>
          <div className={styles.containerInput}>
            <label className={styles.label}>Name:</label>
            <input
              className={styles.input}
              required
              type="text"
              name="name"
              value={activity.name}
              onChange={handleChange}
            />
            <br />

            <label className={styles.label}>Difficulty</label>
            <div className={styles.checkbox}>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value={1}
                  onChange={handleChange}
                />
                1
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value={2}
                  onChange={handleChange}
                />
                2
              </label>

              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value={3}
                  onChange={handleChange}
                />
                3
              </label>

              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value={4}
                  onChange={handleChange}
                />
                4
              </label>

              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value={5}
                  onChange={handleChange}
                />
                5
              </label>
            </div>
            <br />

            <label className={styles.label}>Duration in min </label>
            <input
              required
              className={styles.input}
              type="number"
              name="duration"
              min="1"
              max="240"
              value={activity.duration}
              onChange={handleChange}
            />
            <br />

            <label className={styles.label}>(optional) Image: </label>
            <input
              className={styles.input}
              // required
              type="text"
              name="image"
              value={activity.image}
              onChange={handleChange}
            />
            <br />

            <label className={styles.label}>Description:</label>
            <textarea
              name="info"
              rows="4"
              cols="30"
              value={activity.info}
              onChange={handleChange}
            ></textarea>
            <br />

            <label className={styles.label}>Season:</label>
            <select
              required
              className={styles.input}
              name="seasons"
              onChange={handleSelectSeason}
            >
              <option value={"Autumn"} key={0} name={"Autumn"}>
                Autumn
              </option>
              <option value={"Winter"} key={1} name={"Winter"}>
                Winter
              </option>
              <option value={"Spring"} key={2} name={"Spring"}>
                Spring
              </option>
              <option value={"Summer"} key={3} name={"Summer"}>
                Summer
              </option>
            </select>

            <label className={styles.label}>Countries:</label>
            <select
              required
              className={styles.input}
              name="countries"
              onChange={handleSelect}
            >
              {countries?.map((e, index) => {
                return (
                  <option name={e.id} key={index} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styles.userRequest}>
            <h1>{activity.name ? activity.name : "Activity"}</h1>
            <img
              src={
                activity.image
                  ? activity.image
                  : "https://static.tvtropes.org/pmwiki/pub/images/lava_surfing_page_image_4535.jpg"
              }
              alt={activity.name}
              width={200}
              height={150}
            />
            <h2>Difficulty: {activity.difficulty}</h2>

            <h2>Duration: {activity.duration}</h2>
            <h2>Season: </h2>
            <div className={styles.containerList}>
              {activity.season?.map((e, index) => {
                return (
                  <div key={index} className={styles.seasonMap}>
                    <h4>{e} </h4>
                    <button
                      className={styles.removeBtn}
                      onClick={() => onClickDelete(e)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>

            <h2>Countries: </h2>
            <div className={styles.list}>
              {activityInCountry?.map((e, index) => {
                return (
                  <div className={styles.seasonMap} key={index}>
                    <h4>{e.name} </h4>
                    <button
                      className={styles.removeBtn}
                      onClick={() => onClickDeleteCountry(e.id)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
            <br />
            <span>{activity.info} </span>
          </div>
        </div>

        <div className={styles.footer}>
          {activity.name === "" ||
          activity.difficulty === "" ||
          activity.duration === "" ||
          activity.season === "" ||
          activity.countries === [] ? (
            <h4>Complete the required fields </h4>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
