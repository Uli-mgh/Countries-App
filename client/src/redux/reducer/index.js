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
  DELETE_CARD,
} from "../../constants";

const initialState = {
  allCountries: [],
  filteredCountries: [],
  activities: [],
  country: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRY:
      return {
        ...state,
        filteredCountries: action.payload, //arreglo de paises
        allCountries: action.payload,
      };
    case GETONE:
      return {
        ...state,
        country: action.payload,
      };

    case GETACTIVITY:
      // arreglo de activities
      return {
        ...state,
        activities: action.payload,
      };

    case ORDER_BY_NAME:
      const copyState = [...state.allCountries];

      if (action.payload === "all") {
        return {
          ...state,
          filteredCountries: state.allCountries,
        };
      }
      const arraySort1 =
        action.payload === "A"
          ? copyState.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;

              return 0;
            })
          : copyState.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;

              return 0;
            });

      return {
        ...state,
        filteredCountries: arraySort1,
      };

    case ORDER_BY_POPULATION:
      const copyStates = [...state.allCountries];

      if (action.payload === "all") {
        return {
          ...state,
          filteredCountries: state.allCountries,
        };
      }
      const arraySort2 =
        action.payload === "A"
          ? copyStates.sort(function (a, b) {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;

              return 0;
            })
          : copyStates.sort(function (a, b) {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;

              return 0;
            });
      return {
        ...state,
        filteredCountries: arraySort2,
      };

    case SEASON:
      if (action.payload === "all") {
        return {
          ...state,
          filteredCountries: state.allCountries,
        };
      } else {
        const activity = state.activities.filter((e) =>
          e.season.includes(action.payload)
        );
        const mapActividad = activity[0].countries;

        console.log(activity);
        console.log(mapActividad);

        return {
          ...state,
          filteredCountries: mapActividad,
        };
      }

    case ORDER_BY_ACTIVITY:
      if (action.payload === "all") {
        return {
          ...state,
          filteredCountries: state.allCountries,
        };
      } else {
        const activity = state.activities.filter((e) =>
          e.name.includes(action.payload)
        );
        const mapActividad = activity[0].countries;

        console.log(activity);
        console.log(mapActividad);

        return {
          ...state,
          filteredCountries: mapActividad,
        };
      }

    case CONTINENT:
      if (action.payload === "all") {
        return {
          ...state,
          filteredCountries: state.allCountries.filter(
            (e) => e.continents === action.payload
          ),
        };
      } else {
        return {
          ...state,
          filteredCountries: state.allCountries.filter(
            (e) => e.continents === action.payload
          ),
        };
      }

    case INDEPENDENT:
      if (action.payload === "true") {
        return {
          ...state,
          filteredCountries: state.filteredCountries.filter(
            (e) => e.independent === true
          ),
        };
      } else if (action.payload === "false") {
        return {
          ...state,
          filteredCountries: state.filteredCountries.filter(
            (e) => e.independent === false
          ),
        };
      } else {
        return {
          ...state,
          filteredCountries: state.allCountries,
        };
      }

    case GET_COUNTRY_NAME:
      return {
        ...state,
        filteredCountries: action.payload,
      };

    case DELETE_CARD:
      return {
        ...state,
      };

    default:
      return state;
  }
}
