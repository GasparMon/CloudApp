import { USERWEATHER, WEATHERDAY } from "./types";

const initialState = {
  cityData: {
    name: "",
    coord: {},
    date: null,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USERWEATHER:
      return {
        ...state,
        cityData: {
          ...state.cityData,
          name: action.payload.name,
          coord: action.payload.coord,
        },
      };

    case WEATHERDAY:
      return {
        ...state,
        cityData: {
          ...state.cityData,
          date: action.payload,
        },
      }

    default:
      return state;
  }
}
