import React from "react";
import { useState } from "react";
import Card from "../Card/Card";

import styles from "./cards.module.css";

export default function Cards({ countries }) {
  const [page, setPage] = useState(0);

  const pagination = (cards) => {
    let items = 10;
    const numberPages = Math.ceil(cards.length / items);

    const newCards = Array.from({ length: numberPages }, (e, index) => {
      const start = index * items;
      start ? (items = 10) : (items = 9); // 9 paises en la primera pagina, 10 en la segunda
      return cards.slice(start, start + items);
    });
    return newCards;
  };
  let allcards = pagination(countries);

  const handlePages = (index) => {
    setPage(index);
  };

  const back = () => {
    setPage((oldPage) => {
      let back = oldPage - 1;
      if (back < 0) {
        back = allcards.length - 1;
      }
      return back;
    });
  };

  const next = () => {
    setPage((oldPage) => {
      let next = oldPage + 1;
      if (next > allcards.length - 1) {
        next = 0;
      }
      return next;
    });
  };

  return (
    <div className={styles.containerGlobal}>
      {allcards.length === 0 ? null : (
        <div className={styles.containerPaginate}>
          <div className={styles.containerButtons}>
            <button className={styles.btnBack} onClick={back}>
              Back
            </button>
            {allcards.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    index === page ? styles.btnPage : styles.btnON
                  }`}
                  onClick={() => handlePages(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className={styles.btnNext} onClick={next}>
              Next
            </button>
          </div>
        </div>
      )}

      {allcards.length === 0
        ? null
        : allcards[page].map((p) => {
            return <Card key={p.id} {...p} />;
          })}
    </div>
  );
}
