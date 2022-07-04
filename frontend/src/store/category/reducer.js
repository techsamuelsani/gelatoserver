import {
  OPEN_CATEGORY_DIALOG,
  CLOSE_CATEGORY_DIALOG,
  GET_CATEGORY,
  CREATE_NEW_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  DELETE_ALL_CATEGORY,
  SET_CREATE_CATEGORY_DONE,
  UNSET_CREATE_CATEGORY_DONE,
  SET_UPDATE_CATEGORY_DONE,
  UNSET_UPDATE_CATEGORY_DONE,
  IS_TOP_TOGGLE,
} from "./types";

const initialState = {
  category: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case CREATE_NEW_CATEGORY:
      const data = [...state.category];
      data.unshift(action.payload);
      return {
        ...state,
        category: data,
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        category: state.category.map((category) => {
          if (category._id === action.payload.id) return action.payload.data;
          else return category;
        }),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter(
          (category) => category._id !== action.payload
        ),
      };
    case DELETE_ALL_CATEGORY:
      const category = state.category.filter((item) => {
        return !action.payload.includes(item._id);
      });
      return {
        ...state,
        category,
      };
    case IS_TOP_TOGGLE:
      return {
        ...state,
        category: state.category.map((category) => {
          if (category._id === action.payload._id)
            return {
              ...category,
              isTop: action.payload.isTop,
            };
          else return category;
        }),
      };
    case SET_CREATE_CATEGORY_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_CATEGORY_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_CATEGORY_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_CATEGORY_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_CATEGORY_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_CATEGORY_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default categoryReducer;
