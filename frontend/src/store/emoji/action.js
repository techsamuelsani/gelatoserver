import {
  GET_EMOJI,
  CREATE_NEW_EMOJI,
  EDIT_EMOJI,
  DELETE_EMOJI,
  DELETE_ALL_EMOJI,
  CLOSE_EMOJI_DIALOG,
  SET_CREATE_EMOJI_DONE,
  SET_UPDATE_EMOJI_DONE,
} from "./types";

import axios from "axios";

export const getEmoji = () => (dispatch) => {
  axios
    .get("/emoji")
    .then((res) => {
      dispatch({ type: GET_EMOJI, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const createNewEmoji = (formData) => (dispatch) => {
  axios
    .post("/emoji", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_EMOJI, payload: res.data.data });
      dispatch({ type: CLOSE_EMOJI_DIALOG });
      dispatch({ type: SET_CREATE_EMOJI_DONE });
    })
    .catch((error) => console.log(error));
};
export const editEmoji = (formData, id) => (dispatch) => {
  axios
    .patch("/emoji/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_EMOJI,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_EMOJI_DIALOG });
      dispatch({ type: SET_UPDATE_EMOJI_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteEmoji = (id) => (dispatch) => {
  axios
    .delete(`/emoji/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_EMOJI, payload: id });
    })
    .catch((error) => console.log(error));
};

export const deleteAllEmoji = (ids) => (dispatch) => {
  axios
    .delete(`/emoji/delete/${ids}`)
    .then(() => {
      dispatch({ type: DELETE_ALL_EMOJI, payload: ids });
    })
    .catch((error) => console.log(error));
};
