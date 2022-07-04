import axios from "axios";

import { GET_USER, BLOCK_UNBLOCK_USER } from "./types";

export const getUser = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockUser = (id) => (dispatch) => {
  axios
    .get(`/user/${id}`)
    .then((res) => {
      dispatch({ type: BLOCK_UNBLOCK_USER, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
