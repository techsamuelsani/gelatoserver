import axios from "axios";

import {
  CLEAR_LOGIN_ERROR,
  SET_ADMIN,
  SET_LOGIN_ERROR,
  UPDATE_PROFILE,
} from "./types";

export const login = (email, password, key, package_) => (dispatch) => {
  dispatch({ type: CLEAR_LOGIN_ERROR });
  axios
    .post("/admin", { email, password, key, package_ })
    .then((res) => {
      dispatch({ type: SET_ADMIN, payload: res.data.token });
    })
    .catch(({ response }) => {
      if (response?.data.error) {
        dispatch({ type: SET_LOGIN_ERROR, payload: response.data.error });
      }
    });
};

export const updateProfile = (profileData) => (dispatch) => {
  axios
    .patch("/admin", profileData)
    .then((res) => {
      dispatch({ type: UPDATE_PROFILE, payload: res.data.data });
    })
    .catch(({ response }) => {
      console.log(response?.data);
    });
};

export const getProfile = () => (dispatch) => {
  axios
    .get("/admin")
    .then((res) => {
      dispatch({ type: UPDATE_PROFILE, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
