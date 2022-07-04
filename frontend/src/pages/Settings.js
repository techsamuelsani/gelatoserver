import React, { useState, useEffect } from "react";

//router
import { Link } from "react-router-dom";

//alert
import { permissionError } from "../util/alert";

//redux
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getSetting,
  editSetting,
  handleGoogleSwitch,
  handleRazorSwitch,
  handleStripeSwitch,
} from "../store/setting/action";

//axios
import axios from "axios";

//argon css
import "./css/Profile.css";

//MUI
import IOSSwitch from "@material-ui/core/Switch";
import {
  Chip,
  Input,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const gateway = ["Paytm", "Paypal", "Google pay", "Amazone"];

const SettingPage = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [redeemGateway, setRedeemGateway] = useState([]);

  const handleChange = (event) => {
    setRedeemGateway(event.target.value);
  };

  const [mongoId, setMongoId] = useState(null);
  const [googlePayId, setGooglePayId] = useState(null);
  const [agoraCertificate, setAgoraCertificate] = useState(null);
  const [agoraId, setAgoraId] = useState(null);
  const [policyLink, setPolicyLink] = useState(null);
  const [loginBonus, setLoginBonus] = useState(null);
  const [hostCharge, setHostCharge] = useState(null);
  const [minPoints, setMinPoints] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [howManyCoins, setHowManyCoins] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [userCallCharge, setUserCallCharge] = useState(null);
  const [userLiveStreamingCharge, setUserLiveStreamingCharge] = useState(null);
  const [dailyTaskMinValue, setDailyTaskMinValue] = useState(null);
  const [dailyTaskMaxValue, setDailyTaskMaxValue] = useState(null);
  const [stripeSecreteKey, setStripeSecreteKey] = useState(null);
  const [stripePublishableKey, setStripePublishableKey] = useState(null);
  const [razorPayId, setRazorPayId] = useState(null);

  const [openSuccess, setOpenSuccess] = useState(false);

  const [error, setError] = useState({
    googlePayId: "",
    agoraId: "",
    policyLink: "",
    loginBonus: "",
    hostCharge: "",
    redeemGateway: "",
    minPoints: "",
    currency: "",
    howManyCoins: "",
    toCurrency: "",
    userCallCharge: "",
    userLiveStreamingCharge: "",
    dailyTaskMinValue: "",
    dailyTaskMaxValue: "",
    stripeSecreteKey: "",
    razorPayId: "",
    stripePublishableKey: "",
    agoraCertificate: "",
  });

  const setting = useSelector((state) => state.setting.setting);

  useEffect(() => {
    props.getSetting();
  }, []);

  const hasPermission = useSelector((state) => state.admin.user.flag);

  useEffect(() => {
    setMongoId(setting._id);
    setGooglePayId(setting.googlePayId);
    setAgoraId(setting.agoraId);
    setAgoraCertificate(setting.agoraCertificate);
    setPolicyLink(setting.policyLink);
    setLoginBonus(setting.loginBonus);
    setHostCharge(setting.hostCharge);
    setRedeemGateway(setting.redeemGateway.split(","));
    setMinPoints(setting.minPoints);
    setCurrency(setting.currency);
    setHowManyCoins(setting.howManyCoins);
    setToCurrency(setting.toCurrency);
    setUserCallCharge(setting.userCallCharge);
    setUserLiveStreamingCharge(setting.userLiveStreamingCharge);
    setDailyTaskMinValue(setting.dailyTaskMinValue);
    setDailyTaskMaxValue(setting.dailyTaskMaxValue);
    setStripeSecreteKey(setting.stripeSecreteKey);
    setStripePublishableKey(setting.stripePublishableKey);
    setRazorPayId(setting.razorPayId);
  }, [setting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasPermission) return permissionError();

    if (redeemGateway.length === 0) {
      return setError({
        ...error,
        redeemGateway: "Please Select Atleast One Redeem Gateway!",
      });
    }

    if (
      !googlePayId ||
      !agoraId ||
      !agoraCertificate ||
      !policyLink ||
      !loginBonus ||
      !hostCharge ||
      !redeemGateway ||
      !minPoints ||
      !currency ||
      !howManyCoins ||
      !toCurrency ||
      !userCallCharge ||
      !userLiveStreamingCharge ||
      !dailyTaskMinValue ||
      !dailyTaskMaxValue ||
      !stripePublishableKey ||
      !stripeSecreteKey ||
      !razorPayId
    ) {
      const errors = {};

      if (!googlePayId) errors.googlePayId = "Google Pay Id is Required!";
      if (!agoraId) errors.agoraId = "Agora Id is Required!";
      if (!agoraCertificate)
        errors.agoraCertificate = "Agora Certificate is Required!";
      if (!policyLink) errors.policyLink = "Policy Link is Required!";
      if (!loginBonus) errors.loginBonus = "Login Bonus is Required!";
      if (!hostCharge) errors.hostCharge = "Coin is Required!";
      if (!stripePublishableKey)
        errors.stripePublishableKey = "Stripe Publishable Key is Required!";

      if (!minPoints)
        errors.minPoints = "Minimum Points to Redeem is Required!";
      if (currency == "Currency") errors.currency = "Please Select a Currency!";
      if (!howManyCoins) errors.howManyCoins = "How Many Coins is Required!";
      if (!toCurrency) errors.toCurrency = "To Currency is Required!";
      if (!userCallCharge)
        errors.userCallCharge = "User Call Charge is Required!";
      if (!userLiveStreamingCharge)
        errors.userLiveStreamingCharge =
          "User Live Streaming Value is Required!";
      if (!dailyTaskMinValue)
        errors.dailyTaskMinValue = "Minimum Value is Required!";
      if (!dailyTaskMaxValue)
        errors.dailyTaskMaxValue = "Maximum Value is Required!";
      if (!stripeSecreteKey)
        errors.stripeSecreteKey = "Stripe Secrete Key is Required!";
      if (!razorPayId) errors.razorPayId = "Razor Pay Id is Required!";

      return setError({ ...errors });
    }
    setError({ ...error, redeemGateway: "" });
    const data = {
      googlePayId,
      agoraId,
      agoraCertificate,
      policyLink,
      loginBonus,
      hostCharge,
      redeemGateway: redeemGateway.join(","),
      minPoints,
      currency,
      howManyCoins,
      toCurrency,
      userCallCharge,
      userLiveStreamingCharge,
      dailyTaskMinValue,
      dailyTaskMaxValue,
      razorPayId,
      stripeSecreteKey,
      stripePublishableKey,
    };

    props.editSetting(data, mongoId);

    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const googleSwitch_ = () => {
    if (!hasPermission) return permissionError();
    props.handleGoogleSwitch(mongoId);
  };
  const razorSwitch = () => {
    if (!hasPermission) return permissionError();
    props.handleRazorSwitch(mongoId);
  };
  const stripeSwitch = () => {
    if (!hasPermission) return permissionError();
    props.handleStripeSwitch(mongoId);
  };
  return (
    <div class="main-content mt-5" id="panel">
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Updated successfully.
        </Alert>
      </Snackbar>
      {/* <!-- Page content --> */}
      <div class="page-breadcrumb pt-1 mb-4">
        <div class="row">
          <div class="col-7 align-self-center">
            <div class="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 p-0">
                  <li class="breadcrumb-item">
                    <Link to="/admin/dashboard" class="text-muted">
                      Home
                    </Link>
                  </li>
                  <li
                    class="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Setting
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid mt--6">
        <div class="row">
          <div class="col-xl-6 order-xl-2">
            <div class="card card-profile">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Login Bonus </h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  {/* <h6 class="heading-small text-muted mb-4">
                    User information
                  </h6> */}
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Coin
                          </label>
                          <input
                            type="number"
                            id="input-username"
                            class="form-control"
                            value={loginBonus}
                            onChange={(e) => {
                              setLoginBonus(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  loginBonus: "Login Bonus is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  loginBonus: "",
                                });
                              }
                            }}
                          />
                          {error.loginBonus && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.loginBonus}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a
                        href="#!"
                        class="btn btn-default float-right"
                        onClick={handleSubmit}
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-xl-6 order-xl-1">
            <div class="card">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Set Id & Certificate </h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  {/* <h6 class="heading-small text-muted mb-4">
                    User information
                  </h6> */}
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Agora Id
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control"
                            value={agoraId}
                            onChange={(e) => {
                              setAgoraId(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  agoraId: "Agora Id is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  agoraId: "",
                                });
                              }
                            }}
                          />
                          {error.agoraId && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.agoraId}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>

                      <div class="col-lg-6">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Agora Certificate
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control"
                            value={agoraCertificate}
                            onChange={(e) => {
                              setAgoraCertificate(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  agoraCertificate:
                                    "Agora Certificate is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  agoraCertificate: "",
                                });
                              }
                            }}
                          />
                          {error.agoraCertificate && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.agoraCertificate}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a
                        href="#!"
                        class="btn btn-info float-right"
                        onClick={handleSubmit}
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid mt--6">
        <div class="row">
          <div class="col-xl-6 order-xl-2">
            <div class="card card-profile">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Charges for User & Host </h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  {/* <h6 class="heading-small text-muted mb-4">
                    User information
                  </h6> */}
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Video call charge from User
                          </label>
                          <input
                            type="number"
                            id="input-username"
                            class="form-control"
                            value={userCallCharge}
                            onChange={(e) => {
                              setUserCallCharge(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  userCallCharge:
                                    "User Call Charge Value is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  userCallCharge: "",
                                });
                              }
                            }}
                          />
                          {error.userCallCharge && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.userCallCharge}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Live Streaming Charge from Host
                          </label>
                          <input
                            type="number"
                            id="input-username"
                            class="form-control"
                            value={userLiveStreamingCharge}
                            onChange={(e) => {
                              setUserLiveStreamingCharge(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  userLiveStreamingCharge:
                                    "User Live streaming Charge Value is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  userLiveStreamingCharge: "",
                                });
                              }
                            }}
                          />
                          {error.userLiveStreamingCharge && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.userLiveStreamingCharge}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a
                        href="#!"
                        class="btn btn-primary float-right"
                        onClick={handleSubmit}
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-xl-6 order-xl-1">
            <div class="card">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Daily Task Limit </h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  {/* <h6 class="heading-small text-muted mb-4">
                    User information
                  </h6> */}
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Minimum Value
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control"
                            value={dailyTaskMinValue}
                            onChange={(e) => {
                              setDailyTaskMinValue(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  dailyTaskMinValue:
                                    "Daily Task Minimum Value is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  dailyTaskMinValue: "",
                                });
                              }
                            }}
                          />
                          {error.dailyTaskMinValue && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.dailyTaskMinValue}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Maximum Value
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control"
                            value={dailyTaskMaxValue}
                            onChange={(e) => {
                              setDailyTaskMaxValue(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  dailyTaskMaxValue:
                                    "Daily Task Maximum Value is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  dailyTaskMaxValue: "",
                                });
                              }
                            }}
                          />
                          {error.dailyTaskMaxValue && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.dailyTaskMaxValue}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a
                        href="#!"
                        class="btn btn-danger float-right"
                        onClick={handleSubmit}
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid mt--6">
        <div class="row">
          <div class="col-xl-6 order-xl-2">
            <div class="card card-profile">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Redeem Gateway </h3>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <form>
                  {/* <h6 class="heading-small text-muted mb-4">
                    User information
                  </h6> */}
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label
                            class="form-control-label mr-3"
                            for="input-username"
                          >
                            Redeem Gateway
                          </label>
                          {/* <FormControl className={classes.formControl}> */}
                          <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={redeemGateway}
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={value}
                                    className={classes.chip}
                                  />
                                ))}
                              </div>
                            )}
                            MenuProps={MenuProps}
                          >
                            {gateway.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                // style={getStyles(name, redeemGateway)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {/* </FormControl> */}
                          {error.redeemGateway && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.redeemGateway}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label
                            class="form-control-label mr-3"
                            for="input-username"
                          >
                            Min. points to redeem
                          </label>
                          <input
                            type="number"
                            id="input-username"
                            class="form-control"
                            value={minPoints}
                            onChange={(e) => {
                              setMinPoints(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  minPoints: "Minimum point is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  minPoints: "",
                                });
                              }
                            }}
                          />
                          {error.minPoints && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.minPoints}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label
                            class="form-control-label mr-3"
                            for="input-username"
                          >
                            Choose your currency
                          </label>
                          <select
                            class="form-select form-control"
                            aria-label="Default select example"
                            value={currency}
                            onChange={(e) => {
                              setCurrency(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  currency: "Please select a Currency!",
                                });
                              } else if (e.target.value == "Currency") {
                                return setError({
                                  ...error,
                                  currency: "Please select a Currency!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  currency: "",
                                });
                              }
                            }}
                          >
                            <option selected>Currency</option>
                            <option value="₹">INR</option>
                            <option value="$">USD</option>
                            <option value="£">GBP</option>
                            <option value="€">EUR</option>
                          </select>
                          {error.currency && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.currency}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label
                            class="form-control-label mr-3"
                            for="input-username"
                          >
                            to&nbsp;
                            {currency}
                          </label>
                          <input
                            type="number"
                            disabled
                            id="input-username"
                            class="form-control"
                            value={toCurrency}
                            // onChange={(e) => {
                            //   setToCurrency(e.target.value);

                            //   if (!e.target.value) {
                            //     return setError({
                            //       ...error,
                            //       toCurrency: "To Currency is Required!",
                            //     });
                            //   } else {
                            //     return setError({
                            //       ...error,
                            //       toCurrency: "",
                            //     });
                            //   }
                            // }}
                          />
                          {/* {error.toCurrency && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.toCurrency}
                              </Typography>
                            </div>
                          )} */}
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label
                            class="form-control-label mr-3"
                            for="input-username"
                          >
                            How Many Coins
                          </label>
                          <input
                            type="number"
                            id="input-username"
                            class="form-control"
                            value={howManyCoins}
                            onChange={(e) => {
                              setHowManyCoins(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  howManyCoins: "How Many Coins is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  howManyCoins: "",
                                });
                              }
                            }}
                          />
                          {error.howManyCoins && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.howManyCoins}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Privacy policy link
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control"
                            value={policyLink}
                            onChange={(e) => {
                              setPolicyLink(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  policyLink: "Policy Link is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  policyLink: "",
                                });
                              }
                            }}
                          />
                          {error.policyLink && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.policyLink}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a
                        href="#!"
                        class="btn btn-success float-right"
                        onClick={handleSubmit}
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-xl-6 order-xl-2">
            <div class="card card-profile">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Payment Gateway </h3>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <form>
                  {/* <h6 class="heading-small text-muted mb-4">
                    User information
                  </h6> */}
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <div class="row">
                            <div class="col-md-10">
                              <label
                                class="form-control-label"
                                for="input-username"
                              >
                                Stripe
                              </label>
                            </div>
                            <div class="col-md-2 pl-5">
                              <IOSSwitch
                                onChange={stripeSwitch}
                                checked={setting.stripeSwitch}
                                color="primary"
                              />
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6">
                              <label class="form-control-label">
                                Stripe Secret key
                              </label>
                              <input
                                type="text"
                                id="input-username"
                                class="form-control"
                                value={stripeSecreteKey}
                                onChange={(e) => {
                                  setStripeSecreteKey(e.target.value);

                                  if (!e.target.value) {
                                    return setError({
                                      ...error,
                                      stripeSecreteKey:
                                        "Stripe Secret Key is Required!",
                                    });
                                  } else {
                                    return setError({
                                      ...error,
                                      stripeSecreteKey: "",
                                    });
                                  }
                                }}
                              />
                              {error.stripeSecreteKey && (
                                <div class="pl-1 text-left">
                                  <Typography variant="caption" color="error">
                                    {error.stripeSecreteKey}
                                  </Typography>
                                </div>
                              )}
                            </div>
                            <div class="col-md-6">
                              <label class="form-control-label">
                                Stripe Publishable key
                              </label>
                              <input
                                type="text"
                                id="input-username"
                                class="form-control"
                                value={stripePublishableKey}
                                onChange={(e) => {
                                  setStripePublishableKey(e.target.value);

                                  if (!e.target.value) {
                                    return setError({
                                      ...error,
                                      stripePublishableKey:
                                        "Stripe Publishable Key is Required!",
                                    });
                                  } else {
                                    return setError({
                                      ...error,
                                      stripePublishableKey: "",
                                    });
                                  }
                                }}
                              />
                              {error.stripePublishableKey && (
                                <div class="pl-1 text-left">
                                  <Typography variant="caption" color="error">
                                    {error.stripePublishableKey}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <div class="row">
                            <div class="col-md-10">
                              <label
                                class="form-control-label"
                                for="input-username"
                              >
                                Razor Pay Id
                              </label>
                            </div>
                            <div class="col-md-2 pl-5">
                              <IOSSwitch
                                onChange={razorSwitch}
                                checked={setting.razorPaySwitch}
                                color="primary"
                              />
                            </div>
                          </div>

                          <input
                            type="text"
                            id="input-username"
                            class="form-control"
                            value={razorPayId}
                            onChange={(e) => {
                              setRazorPayId(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  razorPayId: "Razor Pay Id is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  razorPayId: "",
                                });
                              }
                            }}
                          />
                          {error.razorPayId && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.razorPayId}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <div class="row">
                            <div class="col-md-10">
                              <label
                                class="form-control-label"
                                for="input-username"
                              >
                                Google Pay Id
                              </label>
                            </div>
                            <div class="col-md-2 pl-5">
                              <IOSSwitch
                                onChange={googleSwitch_}
                                checked={setting.googlePaySwitch}
                                color="primary"
                              />
                            </div>
                          </div>

                          <textarea
                            type="text"
                            id="input-username"
                            class="form-control"
                            rows="3"
                            cols="2"
                            value={googlePayId}
                            onChange={(e) => {
                              setGooglePayId(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  googlePayId: "Google Pay Id is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  googlePayId: "",
                                });
                              }
                            }}
                          />
                          {error.googlePayId && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.googlePayId}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a
                        href="#!"
                        class="btn btn-warning float-right"
                        onClick={handleSubmit}
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div class="col-xl-3 order-xl-2"></div> */}
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  getSetting,
  editSetting,
  handleGoogleSwitch,
  handleRazorSwitch,
  handleStripeSwitch,
})(SettingPage);
