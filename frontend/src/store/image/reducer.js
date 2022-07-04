import {
  OPEN_IMAGE_DIALOG,
  CLOSE_IMAGE_DIALOG,
  GET_IMAGE,
  CREATE_NEW_IMAGE,
  EDIT_IMAGE,
  DELETE_IMAGE,
  SET_CREATE_IMAGE_DONE,
  UNSET_CREATE_IMAGE_DONE,
  SET_UPDATE_IMAGE_DONE,
  UNSET_UPDATE_IMAGE_DONE,
} from "./types";

const initialState = {
  image: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    case CREATE_NEW_IMAGE:
      const data = [...state.image, ...action.payload];
      // data.unshift(action.payload);
      return {
        ...state,
        image: data,
      };
    case EDIT_IMAGE:
      return {
        ...state,
        image: state.image.map((image) => {
          if (image._id === action.payload.id) return action.payload.data;
          else return image;
        }),
      };
    case DELETE_IMAGE:
      return {
        ...state,
        image: state.image.filter((image) => image._id !== action.payload),
      };

    case SET_CREATE_IMAGE_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_IMAGE_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_IMAGE_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_IMAGE_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_IMAGE_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_IMAGE_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default imageReducer;
