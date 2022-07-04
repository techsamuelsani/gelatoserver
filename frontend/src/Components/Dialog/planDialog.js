import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_PLAN_DIALOG } from "../../store/plan/types";
import { createNewPlan, editPlan } from "../../store/plan/action";

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

const PlanDialog = (props) => {
  const dispatch = useDispatch();
  const { dialog: open, dialogData, plan } = useSelector((state) => state.plan);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  // const [imageData, setImageData] = useState(null);
  // const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [coin, setCoin] = useState(0);
  const [rupee, setRupee] = useState(0);
  // const [currency, setCurrency] = useState("");
  const [productId, setProductId] = useState("");
  const [paymentGateway, setPaymentGateway] = useState("");

  const [errors, setError] = useState({
    coin: "",
    rupee: "",
    // currency: "",
    productId: "",
    paymentGateway: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setCoin(dialogData.coin);
      setRupee(dialogData.rupee);
      setPaymentGateway(dialogData.paymentGateway);
      // setCurrency(dialogData.currency);
      setProductId(dialogData.productId);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        coin: "",
        rupee: "",
        productId: "",
        paymentGateway: "",
        // currency: "",
      });
      setMongoId("");
      setCoin(0);
      setRupee(0);
      setProductId("");
      setPaymentGateway("");
      // setCurrency("");
      // setImageData(null);
      // setImagePath(null);
    },
    [open]
  );

  // const handleInputImage = (e) => {
  //   if (e.target.files[0]) {
  //     setImageData(e.target.files[0]);
  //     const reader = new FileReader();

  //     reader.addEventListener("load", () => {
  //       setImagePath(reader.result);
  //     });
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!coin || !rupee || !productId) {
      const errors = {};

      if (!coin) {
        errors.coin = "Coin can't be a blank!";
      }

      if (!rupee) {
        errors.rupee = "Rupee can't be a blank!";
      }
      // if (!currency) {
      //   errors.currency = "Please select a Currency!";
      // }
      // if (paymentGateway === "google pay") {
      if (!productId) {
        errors.productId = "Product Id can't be a blank!";
      }
      // }
      // if (!paymentGateway) {
      //   errors.paymentGateway = "Please select a Payment Gateway!";
      // }

      return setError({ ...errors });
    }
    // if (paymentGateway === "google pay") {
    //   if (!productId) {
    //     setError({ ...errors, productId: "Product Id can't be a blank!" });
    //   }
    // }
    if (!hasPermission) return permissionError();

    const data = {
      coin,
      rupee,
      paymentGateway: "all",
      // currency,
      productId: productId,
    };

    if (mongoId) {
      props.editPlan(data, mongoId);
    } else {
      props.createNewPlan(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_PLAN_DIALOG });
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
          {"Plan"}
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
                <div class="form-group">
                  <label class="float-left">Coin</label>
                  <input
                    type="Number"
                    class="form-control"
                    placeholder="0"
                    required
                    value={coin}
                    onChange={(e) => {
                      setCoin(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          coin: "Coin can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          coin: "",
                        });
                      }
                    }}
                  />
                  {errors.coin && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.coin}
                      </Typography>
                    </div>
                  )}
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="float-left">Rupee</label>
                      <input
                        type="Number"
                        class="form-control"
                        placeholder="India"
                        required
                        value={rupee}
                        onChange={(e) => {
                          setRupee(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              rupee: "Rupee can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              rupee: "",
                            });
                          }
                        }}
                      />
                      {errors.rupee && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.rupee}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div class="col-md-6">
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
                 */}
                </div>
                {/* {paymentGateway === "google pay" && ( */}
                <div class="form-group">
                  <label class="float-left">Product Id</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="android.test"
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

export default connect(null, { createNewPlan, editPlan })(PlanDialog);
