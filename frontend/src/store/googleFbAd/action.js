import axios from "axios";

import {
  GET_GOOGLE_FB_Ad,
  EDIT_GOOGLE_FB_AD,
  SET_UPDATE_GOOGLE_FB_AD_DONE,
  SHOW_TOGGLE,
} from "./types";

export const getGoogleFbAd = () => (dispatch) => {
  axios
    .get("/advertisement")
    .then((res) => dispatch({ type: GET_GOOGLE_FB_Ad, payload: res.data }))
    .catch((error) => console.log(error));
};

export const showToggle = (id) => (dispatch) => {
  axios
    .patch(`/advertisement/${id}`)
    .then((res) => {
      dispatch({ type: SHOW_TOGGLE, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const editGoogleFbAd = (adData, id) => (dispatch) => {
  debugger;
  axios
    .patch(`/advertisement/googlefb/${id}`, adData)
    .then((res) => {
      debugger;
      dispatch({
        type: EDIT_GOOGLE_FB_AD,
        payload: { data: res.data.data, id },
      });

      dispatch({ type: SET_UPDATE_GOOGLE_FB_AD_DONE });
    })

    .catch((error) => {
      console.log(error);
    });
};
