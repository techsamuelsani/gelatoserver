import {
  OPEN_EMOJI_DIALOG,
  CLOSE_EMOJI_DIALOG,
  GET_EMOJI,
  CREATE_NEW_EMOJI,
  EDIT_EMOJI,
  DELETE_EMOJI,
  DELETE_ALL_EMOJI,
  SET_CREATE_EMOJI_DONE,
  UNSET_CREATE_EMOJI_DONE,
  SET_UPDATE_EMOJI_DONE,
  UNSET_UPDATE_EMOJI_DONE,
} from "./types";

const initialState = {
  emoji: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const emojiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMOJI:
      return {
        ...state,
        emoji: action.payload,
      };
    case CREATE_NEW_EMOJI:
      const data = [...state.emoji, ...action.payload];
      // data.unshift(action.payload);
      return {
        ...state,
        emoji: data,
      };
    case EDIT_EMOJI:
      return {
        ...state,
        emoji: state.emoji.map((emoji) => {
          if (emoji._id === action.payload.id) return action.payload.data;
          else return emoji;
        }),
      };
    case DELETE_EMOJI:
      return {
        ...state,
        emoji: state.emoji.filter((emoji) => emoji._id !== action.payload),
      };
    case DELETE_ALL_EMOJI:
      const emoji = state.emoji.filter((item) => {
        return !action.payload.includes(item._id);
      });
      return {
        ...state,
        emoji,
      };
    case SET_CREATE_EMOJI_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_EMOJI_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_EMOJI_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_EMOJI_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_EMOJI_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_EMOJI_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default emojiReducer;
