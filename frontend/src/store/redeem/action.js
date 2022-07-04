import axios from "axios";

import {
  GET_TRUE_REDEEM,
  GET_FALSE_REDEEM,
  ACCEPT_REDEEM_REQUEST,
} from "./types";

export const getTrueRedeem = () => (dispatch) => {
  axios
    .get("/redeem/show")
    .then((res) => {
      dispatch({ type: GET_TRUE_REDEEM, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const getFalseRedeem = () => (dispatch) => {
  axios
    .get("/redeem")
    .then((res) => {
      dispatch({ type: GET_FALSE_REDEEM, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const acceptRedeemRequest = (id) => (dispatch) => {
  axios
    .patch(`/redeem/${id}`)
    .then((res) => {
      dispatch({ type: ACCEPT_REDEEM_REQUEST, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
