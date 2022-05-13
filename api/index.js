//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Country } = require("./src/db.js");
const axios = require("axios");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const verfifyCountries = await Country.findAll();

  if (verfifyCountries.length < 1) {
    const countries = await axios.get("https://restcountries.com/v3/all");

    const format = countries.data?.map((country) => {
      return {
        id: country.cca3 ? country.cca3 : "Unknown",
        nameCommon: country.name.common ? country.name.common : "Unknown",
        name: country.name.official ? country.name.official : "Unknown",
        capital: country.capital ? country.capital : ["Unknown"],
        subregion: country.subregion ? country.subregion : "Unknown",
        region: country.region ? country.region : "Unknown",
        population: country.population ? country.population : 0,
        area: country.area ? country.area : 0,
        borders: country.borders ? country.borders : ["Unknown"],
        currencies: country.currencies
          ? Object.values(country.currencies).map((c) => c.name)
          : ["Unknown"],
        languages: country.languages
          ? Object.values(country.languages)
          : ["Unknown"],
        flag: country.flags[1],
        continents: country.continents[0] ? country.continents[0] : "Unknown",
        independent: country.independent ? country.independent : false,
      };
    });

    // console.log(format);

    await Country.bulkCreate(format);
    console.log("Countries successfully loaded!");
  }

  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    console.log("DB loaded");
    console.log("All ok!!!");
  });
});
