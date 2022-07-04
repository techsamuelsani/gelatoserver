import {
  OPEN_VIP_PLAN_DIALOG,
  CLOSE_VIP_PLAN_DIALOG,
  GET_VIP_PLAN,
  CREATE_NEW_VIP_PLAN,
  EDIT_VIP_PLAN,
  DELETE_VIP_PLAN,
  ACTIVE_INACTIVE_VIP_PLAN,
  SET_CREATE_VIP_PLAN_DONE,
  UNSET_CREATE_VIP_PLAN_DONE,
  SET_UPDATE_VIP_PLAN_DONE,
  UNSET_UPDATE_VIP_PLAN_DONE,
} from "./types";

const initialState = {
  VIPPlan: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const VIPPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIP_PLAN:
      return {
        ...state,
        VIPPlan: action.payload,
      };
    case CREATE_NEW_VIP_PLAN:
      const data = [...state.VIPPlan];
      data.unshift(action.payload);
      return {
        ...state,
        VIPPlan: data,
      };
    case EDIT_VIP_PLAN:
      return {
        ...state,
        VIPPlan: state.VIPPlan.map((plan) => {
          if (plan._id === action.payload.id) return action.payload.data;
          else return plan;
        }),
      };
    case DELETE_VIP_PLAN:
      return {
        ...state,
        VIPPlan: state.VIPPlan.filter((plan) => plan._id !== action.payload),
      };
    case ACTIVE_INACTIVE_VIP_PLAN:
      return {
        ...state,
        VIPPlan: state.VIPPlan.map((plan) => {
          if (plan._id === action.payload._id)
            return {
              ...plan,
              isActive: action.payload.isActive,
            };
          else return plan;
        }),
      };
    case SET_CREATE_VIP_PLAN_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_VIP_PLAN_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_VIP_PLAN_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_VIP_PLAN_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_VIP_PLAN_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_VIP_PLAN_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default VIPPlanReducer;
