import {
  OPEN_PLAN_DIALOG,
  CLOSE_PLAN_DIALOG,
  GET_PLAN,
  CREATE_NEW_PLAN,
  EDIT_PLAN,
  DELETE_PLAN,
  SET_CREATE_PLAN_DONE,
  UNSET_CREATE_PLAN_DONE,
  SET_UPDATE_PLAN_DONE,
  UNSET_UPDATE_PLAN_DONE,
} from "./types";

const initialState = {
  plan: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAN:
      return {
        ...state,
        plan: action.payload,
      };
    case CREATE_NEW_PLAN:
      const data = [...state.plan];
      data.unshift(action.payload);
      return {
        ...state,
        plan: data,
      };
    case EDIT_PLAN:
      return {
        ...state,
        plan: state.plan.map((plan) => {
          if (plan._id === action.payload.id) return action.payload.data;
          else return plan;
        }),
      };
    case DELETE_PLAN:
      return {
        ...state,
        plan: state.plan.filter((plan) => plan._id !== action.payload),
      };
    case SET_CREATE_PLAN_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_PLAN_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_PLAN_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_PLAN_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_PLAN_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_PLAN_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default planReducer;
