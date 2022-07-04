import {
  GET_TRUE_REDEEM,
  GET_FALSE_REDEEM,
  ACCEPT_REDEEM_REQUEST,
} from "./types";

const initialState = {
  trueRedeem: [],
  falseRedeem: [],
};

const redeemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRUE_REDEEM:
      return {
        ...state,
        trueRedeem: action.payload,
      };
    case GET_FALSE_REDEEM:
      return {
        ...state,
        falseRedeem: action.payload,
      };
    case ACCEPT_REDEEM_REQUEST:
      debugger;
      return {
        ...state,
        falseRedeem: state.falseRedeem.filter(
          (redeem) => redeem._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default redeemReducer;
