import {
  GET_IMAGE,
  CREATE_NEW_IMAGE,
  EDIT_IMAGE,
  DELETE_IMAGE,
  CLOSE_IMAGE_DIALOG,
  SET_CREATE_IMAGE_DONE,
  SET_UPDATE_IMAGE_DONE,
} from "./types";

import axios from "axios";

export const getImage = () => (dispatch) => {
  axios
    .get("/image")
    .then((res) => {
      dispatch({ type: GET_IMAGE, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const createNewImage = (formData) => (dispatch) => {
  axios
    .post("/image", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_IMAGE, payload: res.data.data });
      dispatch({ type: CLOSE_IMAGE_DIALOG });
      dispatch({ type: SET_CREATE_IMAGE_DONE });
    })
    .catch((error) => console.log(error));
};
export const editImage = (formData, id) => (dispatch) => {
  axios
    .patch("/image/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_IMAGE,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_IMAGE_DIALOG });
      dispatch({ type: SET_UPDATE_IMAGE_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteImage = (id) => (dispatch) => {
  axios
    .delete(`/image/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_IMAGE, payload: id });
    })
    .catch((error) => console.log(error));
};
