import {
  GET_CATEGORY,
  CREATE_NEW_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  DELETE_ALL_CATEGORY,
  CLOSE_CATEGORY_DIALOG,
  SET_CREATE_CATEGORY_DONE,
  SET_UPDATE_CATEGORY_DONE,
  IS_TOP_TOGGLE,
} from "./types";

import axios from "axios";

export const getCategory = () => (dispatch) => {
  axios
    .get("/category")
    .then((res) => {
      dispatch({ type: GET_CATEGORY, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const createNewCategory = (formData) => (dispatch) => {
  axios
    .post("/category", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_CATEGORY, payload: res.data.data });
      dispatch({ type: CLOSE_CATEGORY_DIALOG });
      dispatch({ type: SET_CREATE_CATEGORY_DONE });
    })
    .catch((error) => console.log(error));
};
export const editCategory = (formData, id) => (dispatch) => {
  axios
    .patch("/category/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_CATEGORY,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_CATEGORY_DIALOG });
      dispatch({ type: SET_UPDATE_CATEGORY_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteCategory = (id) => (dispatch) => {
  axios
    .delete(`/category/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_CATEGORY, payload: id });
    })
    .catch((error) => console.log(error));
};

export const isTopToggle = (id) => (dispatch) => {
  axios
    .put(`/category/${id}`)
    .then((res) => {
      dispatch({ type: IS_TOP_TOGGLE, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const deleteAllCategory = (ids) => (dispatch) => {
  axios
    .delete(`/category/delete/${ids}`)
    .then(() => {
      dispatch({ type: DELETE_ALL_CATEGORY, payload: ids });
    })
    .catch((error) => console.log(error));
};
