import { GET_PURCHASE_COIN_HISTORY } from "./types";

const initialState = {
  history: [],
};

const purchaseCoinHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PURCHASE_COIN_HISTORY:
      return {
        ...state,
        history: action.payload,
      };

    default:
      return state;
  }
};

export default purchaseCoinHistoryReducer;
