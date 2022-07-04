import axios from "axios";

import { GET_HOST, ENABLE_DISABLE_HOST } from "./types";

export const getHost = () => (dispatch) => {
  axios
    .get("/host")
    .then((res) => {
      dispatch({ type: GET_HOST, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const enableDisableHost = (id) => (dispatch) => {
  axios
    .get(`/host/enableDisable/${id}`)
    .then((res) => {
      dispatch({ type: ENABLE_DISABLE_HOST, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
