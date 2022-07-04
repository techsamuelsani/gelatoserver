import { GET_HOST, ENABLE_DISABLE_HOST } from "./types";

const initialState = {
  host: [],
};

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOST:
      return {
        ...state,
        host: action.payload,
      };
    case ENABLE_DISABLE_HOST:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host._id === action.payload._id)
            return {
              ...host,
              isAccepted: action.payload.isAccepted,
            };
          else return host;
        }),
      };
    default:
      return state;
  }
};

export default hostReducer;
