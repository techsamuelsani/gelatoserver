import {
  GET_GOOGLE_FB_Ad,
  SHOW_TOGGLE,
  EDIT_GOOGLE_FB_AD,
  SET_UPDATE_GOOGLE_FB_AD_DONE,
  UNSET_UPDATE_GOOGLE_FB_AD_DONE,
} from "./types";

const initialState = {
  googleFb: [],
  updateDone: false,
};

const googleFbReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GOOGLE_FB_Ad:
      return {
        ...state,
        googleFb: action.payload,
      };
    case SHOW_TOGGLE:
      return {
        ...state,
        googleFb: state.googleFb.map((ad) => {
          if (ad._id === action.payload._id)
            return {
              ...ad,
              show: action.payload.show,
            };
          else return ad;
        }),
      };
    case EDIT_GOOGLE_FB_AD:
      return {
        ...state,
        googleFb: state.googleFb.map((ad) => {
          if (ad._id === action.payload.id)
            return { ...ad, ...action.payload.data };
          else return ad;
        }),
      };
    case SET_UPDATE_GOOGLE_FB_AD_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_GOOGLE_FB_AD_DONE:
      return {
        ...state,
        updateDone: false,
      };
    default:
      return state;
  }
};

export default googleFbReducer;
