import {
  OPEN_GIFT_DIALOG,
  CLOSE_GIFT_DIALOG,
  GET_GIFT,
  CREATE_NEW_GIFT,
  EDIT_GIFT,
  DELETE_GIFT,
  DELETE_ALL_GIFT,
  SET_CREATE_GIFT_DONE,
  UNSET_CREATE_GIFT_DONE,
  SET_UPDATE_GIFT_DONE,
  UNSET_UPDATE_GIFT_DONE,
} from "./types";

const initialState = {
  gift: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const giftReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GIFT:
      return {
        ...state,
        gift: action.payload,
      };
    case CREATE_NEW_GIFT:
      const data = [...state.gift, ...action.payload];
      // data.unshift(action.payload);
      return {
        ...state,
        gift: data,
      };
    case EDIT_GIFT:
      return {
        ...state,
        gift: state.gift.map((gift) => {
          if (gift._id === action.payload.id) return action.payload.data;
          else return gift;
        }),
      };
    case DELETE_GIFT:
      return {
        ...state,
        gift: state.gift.filter((gift) => gift._id !== action.payload),
      };
    case DELETE_ALL_GIFT:
      const gift = state.gift.filter((item) => {
        return !action.payload.includes(item._id);
      });
      return {
        ...state,
        gift,
      };
    case SET_CREATE_GIFT_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_GIFT_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_GIFT_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_GIFT_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_GIFT_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_GIFT_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default giftReducer;
