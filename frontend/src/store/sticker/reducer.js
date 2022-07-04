import {
  OPEN_STICKER_DIALOG,
  CLOSE_STICKER_DIALOG,
  GET_STICKER,
  CREATE_NEW_STICKER,
  EDIT_STICKER,
  DELETE_STICKER,
  DELETE_ALL_STICKER,
  SET_CREATE_STICKER_DONE,
  UNSET_CREATE_STICKER_DONE,
  SET_UPDATE_STICKER_DONE,
  UNSET_UPDATE_STICKER_DONE,
} from "./types";

const initialState = {
  sticker: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const stickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STICKER:
      return {
        ...state,
        sticker: action.payload,
      };
    case CREATE_NEW_STICKER:
      const data = [...state.sticker, ...action.payload];
      // data.unshift(action.payload);
      return {
        ...state,
        sticker: data,
      };
    case EDIT_STICKER:
      return {
        ...state,
        sticker: state.sticker.map((sticker) => {
          if (sticker._id === action.payload.id) return action.payload.data;
          else return sticker;
        }),
      };
    case DELETE_STICKER:
      return {
        ...state,
        sticker: state.sticker.filter(
          (sticker) => sticker._id !== action.payload
        ),
      };
    case DELETE_ALL_STICKER:
      const sticker = state.sticker.filter((item) => {
        return !action.payload.includes(item._id);
      });
      return {
        ...state,
        sticker,
      };

    case SET_CREATE_STICKER_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_STICKER_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_STICKER_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_STICKER_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_STICKER_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_STICKER_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default stickerReducer;
