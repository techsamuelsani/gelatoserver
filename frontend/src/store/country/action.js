import {
  GET_COUNTRY,
  CREATE_NEW_COUNTRY,
  EDIT_COUNTRY,
  DELETE_COUNTRY,
  CLOSE_COUNTRY_DIALOG,
  SET_CREATE_COUNTRY_DONE,
  SET_UPDATE_COUNTRY_DONE,
  DELETE_ALL_COUNTRY,
} from "./types";

import axios from "axios";

export const getCountry = () => (dispatch) => {
  axios
    .get("/country")
    .then((res) => {
      dispatch({ type: GET_COUNTRY, payload: res.data.country });
    })
    .catch((error) => console.log(error));
};

export const createNewCountry = (formData) => (dispatch) => {
  axios
    .post("/country", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_COUNTRY, payload: res.data.country });
      dispatch({ type: CLOSE_COUNTRY_DIALOG });
      dispatch({ type: SET_CREATE_COUNTRY_DONE });
    })
    .catch((error) => console.log(error));
};
export const editCountry = (formData, id) => (dispatch) => {
  axios
    .patch("/country/" + id, formData)
    .then((res) => {
      dispatch({ type: EDIT_COUNTRY, payload: { data: res.data.country, id } });
      dispatch({ type: CLOSE_COUNTRY_DIALOG });
      dispatch({ type: SET_UPDATE_COUNTRY_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteCountry = (id) => (dispatch) => {
  axios
    .delete(`/country/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_COUNTRY, payload: id });
    })
    .catch((error) => console.log(error));
};

export const deleteAllCountry = (ids) => (dispatch) => {
  axios
    .delete(`/country/delete/${ids}`)
    .then(() => {
      dispatch({ type: DELETE_ALL_COUNTRY, payload: ids });
    })
    .catch((error) => console.log(error));
};
