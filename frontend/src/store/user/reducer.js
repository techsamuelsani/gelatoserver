import { GET_USER, BLOCK_UNBLOCK_USER } from "./types";

const initialState = {
  user: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case BLOCK_UNBLOCK_USER:
      return {
        ...state,
        user: state.user.map((user) => {
          if (user._id === action.payload._id)
            return {
              ...user,
              block: action.payload.block,
            };
          else return user;
        }),
      };
    default:
      return state;
  }
};

export default userReducer;
