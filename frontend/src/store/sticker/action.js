import {
  GET_STICKER,
  CREATE_NEW_STICKER,
  EDIT_STICKER,
  DELETE_STICKER,
  DELETE_ALL_STICKER,
  CLOSE_STICKER_DIALOG,
  SET_CREATE_STICKER_DONE,
  SET_UPDATE_STICKER_DONE,
} from "./types";

import axios from "axios";

export const getSticker = () => (dispatch) => {
  axios
    .get("/sticker")
    .then((res) => {
      dispatch({ type: GET_STICKER, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const createNewSticker = (formData) => (dispatch) => {
  axios
    .post("/sticker", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_STICKER, payload: res.data.data });
      dispatch({ type: CLOSE_STICKER_DIALOG });
      dispatch({ type: SET_CREATE_STICKER_DONE });
    })
    .catch((error) => console.log(error));
};
export const editSticker = (formData, id) => (dispatch) => {
  axios
    .patch("/sticker/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_STICKER,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_STICKER_DIALOG });
      dispatch({ type: SET_UPDATE_STICKER_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteSticker = (id) => (dispatch) => {
  axios
    .delete(`/sticker/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_STICKER, payload: id });
    })
    .catch((error) => console.log(error));
};

export const deleteAllSticker = (ids) => (dispatch) => {
  axios
    .delete(`/sticker/delete/${ids}`)
    .then(() => {
      dispatch({ type: DELETE_ALL_STICKER, payload: ids });
    })
    .catch((error) => console.log(error));
};
