import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_VIP_PLAN_DIALOG } from "../../store/VIPplan/types";
import { createNewVIPPlan, editVIPPlan } from "../../store/VIPplan/action";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//custom javascript
import "../../dist/js/custom.min.js";
import "../../dist/js/app-style-switcher";
import "../../dist/js/sidebarmenu";
import "../../dist/js/feather.min.js";
import "../../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";

//icon

import Cancel from "@material-ui/icons/Cancel";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";

//dialog
import Dialog from "@material-ui/core/Dialog";

const VIPPlanDialog = (props) => {
  const dispatch = useDispatch();
  const {
    dialog: open,
    dialogData,
    VIPPlan,
  } = useSelector((state) => state.VIPPlan);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const [mongoId, setMongoId] = useState("");
  const [time, setTime] = useState("");
  const [selectDay, setSelectDay] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentGateway, setPaymentGateway] = useState("");
  const [productId, setProductId] = useState("");

  const [errors, setError] = useState({
    time: "",
    price: "",
    selectDay: "",
    productId: "",
    paymentGateway: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setTime(dialogData.time.split(" ")[0]);
      setPrice(dialogData.price);
      setDiscount(dialogData.discount);
      setSelectDay(dialogData.time.split(" ")[1]);
      setProductId(dialogData.productId);
      setPaymentGateway(dialogData.paymentGateway);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        time: "",
        price: "",
        selectDay: "",
        productId: "",
        paymentGateway: "",
      });
      setMongoId("");
      setTime("");
      setPrice(0);
      setDiscount(0);
      setProductId("");
      setPaymentGateway("");
      setSelectDay("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time || !price || !selectDay || !productId) {
      const errors = {};

      if (!time) {
        errors.time = "Time can't be a blank!";
      }

      if (!price) {
        errors.price = "Price can't be a blank!";
      }
      if (!selectDay) {
        errors.selectDay = "Please Select Atleast one option!";
      }
      // if (!paymentGateway) {
      //   errors.paymentGateway = "Please select a Payment Gateway!";
      // }
      // if (paymentGateway === "google pay") {
      if (!productId) {
        errors.productId = "Product Id can't be a blank!";
        // }
      }

      return setError({ ...errors });
    }
    // if (paymentGateway === "google pay") {
    //   if (!productId) {
    //     setError({ ...errors, productId: "Product Id can't be a blank!" });
    //   }
    // }
    if (!hasPermission) return permissionError();

    const data = {
      time: time + " " + selectDay,
      price,
      discount: discount === null ? 0 : discount,
      productId: productId,
      paymentGateway: "all",
    };

    if (mongoId) {
      props.editVIPPlan(data, mongoId);
    } else {
      props.createNewVIPPlan(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_VIP_PLAN_DIALOG });
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title" style={{ marginLeft: 20 }}>
          {"VIP Plan"}
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#5E72E4",
          }}
        >
          <Tooltip title="Close">
            <Cancel onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="modal-body pt-1 px-1 pb-3">
            <div class="d-flex flex-column text-center">
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="float-left">Time</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="1"
                        required
                        value={time}
                        onChange={(e) => {
                          setTime(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              time: "Time can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              time: "",
                            });
                          }
                        }}
                      />
                      {errors.time && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.time}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="float-left">Select Option</label>

                    <select
                      class="form-select form-control"
                      aria-label="Default select example"
                      value={selectDay}
                      onChange={(e) => {
                        setSelectDay(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            selectDay: "Please select an Option!",
                          });
                        } else if (e.target.value == "Select") {
                          return setError({
                            ...errors,
                            selectDay: "Please select an Option!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            selectDay: "",
                          });
                        }
                      }}
                    >
                      <option selected>Select</option>
                      <option value="day">Day</option>
                      <option value="month">Month</option>
                      <option value="year">Year</option>
                    </select>
                    {errors.selectDay && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.selectDay}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div class="row form-group">
                  <div class="col-md-12">
                    <label class="float-left">Payment Gateway</label>

                    <select
                      class="form-select form-control"
                      aria-label="Default select example"
                      value={paymentGateway}
                      onChange={(e) => {
                        setPaymentGateway(e.target.value);

                        if (!e.target.value) {
                          return setError({
                            ...errors,
                            paymentGateway: "Please select a Payment Gateway!",
                          });
                        } else if (e.target.value == "Payment Gateway") {
                          return setError({
                            ...errors,
                            paymentGateway: "Please select a Payment Gateway!",
                          });
                        } else {
                          return setError({
                            ...errors,
                            paymentGateway: "",
                          });
                        }
                      }}
                    >
                      <option selected>Payment Gateway</option>
                      <option value="stripe">Stripe</option>
                      <option value="google pay">Google Pay</option>
                      <option value="razor pay">Razor Pay</option>
                    </select>
                    {errors.paymentGateway && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.paymentGateway}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
                 */}
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="float-left">Price</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="200"
                        required
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              price: "Price can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              price: "",
                            });
                          }
                        }}
                      />
                      {errors.price && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.price}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="float-left">Discount</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="10"
                        required
                        value={discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* {paymentGateway === "google pay" && ( */}
                <div class="form-group">
                  <label class="float-left">Product Id</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="com.android.test"
                    required
                    value={productId === "null" ? "" : productId}
                    onChange={(e) => {
                      setProductId(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          productId: "Product Id can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          productId: "",
                        });
                      }
                    }}
                  />
                  {errors.productId && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.productId}
                      </Typography>
                    </div>
                  )}
                </div>
                {/* )} */}

                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { createNewVIPPlan, editVIPPlan })(VIPPlanDialog);
