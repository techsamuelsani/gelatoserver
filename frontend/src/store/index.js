import { combineReducers } from "redux";

import dashboardReducer from "./dashboard/reducer";
import countryReducer from "./country/reducer";
import categoryReducer from "./category/reducer";
import emojiReducer from "./emoji/reducer";
import userReducer from "./user/reducer";
import giftReducer from "./gift/reducer";
import imageReducer from "./image/reducer";
import stickerReducer from "./sticker/reducer";
import planReducer from "./plan/reducer";
import VIPPlanReducer from "./VIPplan/reducer";
import adminReducer from "./admin/reducer";
import settingReducer from "./setting/reducer";
import historyReducer from "./purchaseCoinHistory/reducer";
import redeemReducer from "./redeem/reducer";
import googleFbAdAdReducer from "./googleFbAd/reducer";
import reportUserReducer from "./reportUser/reducer";
import spinnerReducer from "./spinner/reducer";
import hostReducer from "./host/reducer";

export default combineReducers({
  dashboard: dashboardReducer,
  admin: adminReducer,
  country: countryReducer,
  category: categoryReducer,
  emoji: emojiReducer,
  user: userReducer,
  gift: giftReducer,
  image: imageReducer,
  sticker: stickerReducer,
  VIPPlan: VIPPlanReducer,
  plan: planReducer,
  setting: settingReducer,
  history: historyReducer,
  redeem: redeemReducer,
  report: reportUserReducer,
  googleFbAd: googleFbAdAdReducer,
  spinner: spinnerReducer,
  host: hostReducer,
});
