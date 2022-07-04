import {
  OPEN_COUNTRY_DIALOG,
  CLOSE_COUNTRY_DIALOG,
  GET_COUNTRY,
  CREATE_NEW_COUNTRY,
  EDIT_COUNTRY,
  DELETE_COUNTRY,
  DELETE_ALL_COUNTRY,
  SET_CREATE_COUNTRY_DONE,
  UNSET_CREATE_COUNTRY_DONE,
  SET_UPDATE_COUNTRY_DONE,
  UNSET_UPDATE_COUNTRY_DONE,
} from "./types";

const initialState = {
  country: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case CREATE_NEW_COUNTRY:
      const data = [...state.country];
      data.unshift(action.payload);
      return {
        ...state,
        country: data,
      };
    case EDIT_COUNTRY:
      return {
        ...state,
        country: state.country.map((country) => {
          if (country._id === action.payload.id) return action.payload.data;
          else return country;
        }),
      };
    case DELETE_COUNTRY:
      debugger;
      return {
        ...state,
        country: state.country.filter((country) => {
          debugger;
          return country._id !== action.payload;
        }),
      };

    case DELETE_ALL_COUNTRY:
      const country = state.country.filter((item) => {
        return !action.payload.includes(item._id);
      });
      return {
        ...state,
        country,
      };
    case SET_CREATE_COUNTRY_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_COUNTRY_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_COUNTRY_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_COUNTRY_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_COUNTRY_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_COUNTRY_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default countryReducer;
