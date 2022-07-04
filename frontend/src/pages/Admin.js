import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { getProfile } from "../store/admin/action";
import { getUser } from "../store/user/action";
import { getCountry } from "../store/country/action";
import { getCategory } from "../store/category/action";
import { getGift } from "../store/gift/action";
import { getEmoji } from "../store/emoji/action";
import { getSticker } from "../store/sticker/action";
import { getPlan } from "../store/plan/action";
import { getSetting } from "../store/setting/action";
import { getPurchaseCoinHistory } from "../store/purchaseCoinHistory/action";
import { getReportedUser } from "../store/reportUser/action";

//components
import UserTable from "../Components/Table/UserTable";
import CountryTable from "../Components/Table/CountryTable";
import CategoryTable from "../Components/Table/CategoryTable";
import ImageTable from "../Components/Table/ImageTable";
import GiftTable from "../Components/Table/GiftTable";
import EmojiTable from "../Components/Table/EmojiTable";
import StickerTable from "../Components/Table/StickerTable";
import ReportUserTable from "../Components/Table/ReportUserTable";
import ViewReportUserTable from "../Components/Table/ViewReportUserTable";
import PlanTable from "../Components/Table/PlanTable";
import VIPPlanTable from "../Components/Table/VIPPlanTable";
import PurchaseCoinHistoryTable from "../Components/Table/PurchaseCoinHistoryTable";
import GoogleFbTable from "../Components/Table/GoogleFbTable";
import HostTable from "../Components/Table/HostTable";
import RedeemTable from "../Components/Table/RedeemTable";
import ProfilePage from "./Profile";
import SettingPage from "./Settings";
import DashboardPage from "./Dashboard";
import Navbar from "../Components/Navbar/Navbar";

import Spinner from "../Components/Spinner";

const Admin = (props) => {
  const location = useRouteMatch();
  const history = useHistory();
  useEffect(() => {
    if (history.location.pathname === "/admin") {
      history.push("/admin/dashboard");
    }
  }, []);

  (() => {
    if (window.localStorage) {
      if (history.location.pathname === "/admin") {
        history.push("/admin/dashboard");
      }

      if (!localStorage.getItem("firstLoad")) {
        localStorage["firstLoad"] = true;
        window.location.reload(true);
      }
    }
  })();

  useEffect(() => {
    props.getUser();
    props.getCountry();
    props.getCategory();
    props.getGift();
    props.getEmoji();
    props.getSticker();
    props.getPlan();
    props.getSetting();
    props.getPurchaseCoinHistory();
    props.getReportedUser();
    props.getProfile();
  }, []);

  // console.log(location.path);
  return (
    <Fragment>
      <div
        id="main-wrapper"
        data-theme="light"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-boxed-layout="full"
      >
        <Navbar />
        {/* </div> */}
        <div class="page-wrapper" style={{ display: "block" }}>
          <Switch>
            <Route
              path={`${location.path}/dashboard`}
              exact
              component={DashboardPage}
            />
            <Route
              path={`${location.path}/country`}
              exact
              component={CountryTable}
            />
            <Route
              path={`${location.path}/category`}
              exact
              component={CategoryTable}
            />
            <Route path={`${location.path}/user`} exact component={UserTable} />
            <Route
              path={`${location.path}/image`}
              exact
              component={ImageTable}
            />
            <Route
              path={`${location.path}/emoji`}
              exact
              component={EmojiTable}
            />
            <Route path={`${location.path}/HOST`} exact component={HostTable} />
            <Route
              exact
              path={`${location.path}/report/:id`}
              component={ViewReportUserTable}
            />
            <Route
              path={`${location.path}/sticker`}
              exact
              component={StickerTable}
            />
            <Route path={`${location.path}/gift`} exact component={GiftTable} />
            <Route
              path={`${location.path}/googleFb`}
              exact
              component={GoogleFbTable}
            />
            <Route
              path={`${location.path}/history`}
              exact
              component={PurchaseCoinHistoryTable}
            />
            <Route path={`${location.path}/plan`} exact component={PlanTable} />
            <Route
              path={`${location.path}/vipplan`}
              exact
              component={VIPPlanTable}
            />
            <Route
              path={`${location.path}/report`}
              exact
              component={ReportUserTable}
            />

            <Route
              path={`${location.path}/redeem`}
              exact
              component={RedeemTable}
            />
            {/* <Route path={`${location.path}/video`} exact component={VideoTable} /> */}
            {/* <Route
            path={`${location.path}/wallet`}
            exact
            component={WalletTable}
          /> */}
            <Route
              path={`${location.path}/setting`}
              exact
              component={SettingPage}
            />
            <Route
              path={`${location.path}/profile`}
              exact
              component={ProfilePage}
            />
          </Switch>
          <Spinner />
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, {
  getUser,
  getCountry,
  getCategory,
  getGift,
  getEmoji,
  getSticker,
  getPlan,
  getSetting,
  getPurchaseCoinHistory,
  getReportedUser,
  getProfile,
})(Admin);

export const state = "https://dev.digicean.com/api/clientpackagechk";
