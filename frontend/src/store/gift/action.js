import {
  GET_GIFT,
  CREATE_NEW_GIFT,
  EDIT_GIFT,
  DELETE_GIFT,
  DELETE_ALL_GIFT,
  CLOSE_GIFT_DIALOG,
  SET_CREATE_GIFT_DONE,
  SET_UPDATE_GIFT_DONE,
} from "./types";

import axios from "axios";

export const getGift = () => (dispatch) => {
  axios
    .get("/gift")
    .then((res) => {
      dispatch({ type: GET_GIFT, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const createNewGift = (formData) => (dispatch) => {
  axios
    .post("/gift", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_GIFT, payload: res.data.data });
      dispatch({ type: CLOSE_GIFT_DIALOG });
      dispatch({ type: SET_CREATE_GIFT_DONE });
    })
    .catch((error) => console.log(error));
};
export const editGift = (formData, id) => (dispatch) => {
  axios
    .patch("/gift/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_GIFT,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_GIFT_DIALOG });
      dispatch({ type: SET_UPDATE_GIFT_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteGift = (id) => (dispatch) => {
  axios
    .delete(`/gift/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_GIFT, payload: id });
    })
    .catch((error) => console.log(error));
};

export const deleteAllGift = (ids) => (dispatch) => {
  axios
    .delete(`/gift/delete/${ids}`)
    .then(() => {
      dispatch({ type: DELETE_ALL_GIFT, payload: ids });
    })
    .catch((error) => console.log(error));
};
