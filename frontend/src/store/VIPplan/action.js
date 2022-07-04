import {
  GET_VIP_PLAN,
  CREATE_NEW_VIP_PLAN,
  EDIT_VIP_PLAN,
  DELETE_VIP_PLAN,
  ACTIVE_INACTIVE_VIP_PLAN,
  CLOSE_VIP_PLAN_DIALOG,
  SET_CREATE_VIP_PLAN_DONE,
  SET_UPDATE_VIP_PLAN_DONE,
} from "./types";

import axios from "axios";

export const getVIPPlan = () => (dispatch) => {
  axios
    .get("/VIPplan")
    .then((res) => {
      dispatch({ type: GET_VIP_PLAN, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const createNewVIPPlan = (formData) => (dispatch) => {
  axios
    .post("/VIPplan", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_VIP_PLAN, payload: res.data.data });
      dispatch({ type: CLOSE_VIP_PLAN_DIALOG });
      dispatch({ type: SET_CREATE_VIP_PLAN_DONE });
    })
    .catch((error) => console.log(error));
};
export const editVIPPlan = (formData, id) => (dispatch) => {
  axios
    .patch("/VIPplan/" + id, formData)
    .then((res) => {
      dispatch({ type: EDIT_VIP_PLAN, payload: { data: res.data.data, id } });
      dispatch({ type: CLOSE_VIP_PLAN_DIALOG });
      dispatch({ type: SET_UPDATE_VIP_PLAN_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteVIPPlan = (id) => (dispatch) => {
  axios
    .delete(`/VIPplan/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_VIP_PLAN, payload: id });
    })
    .catch((error) => console.log(error));
};

export const activeInactiveVIPPlan = (id) => (dispatch) => {
  axios
    .get(`/VIPplan/active/${id}`)
    .then((res) => {
      dispatch({ type: ACTIVE_INACTIVE_VIP_PLAN, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
