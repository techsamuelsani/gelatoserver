import React, { useState, useEffect } from "react";

//router
import { Link } from "react-router-dom";

//axios
import axios from "axios";

import "../dist/css/style.min.css";
import "../dist/css/style.css";

import Wrapkit from "../assets/images/big/icon.png";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");

  const [errors, setError] = useState({
    email: "",
  });

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      const errors = {};

      if (!email) {
        errors.email = "Email can't be a blank!";
      }

      return setError({ ...errors });
    }
    axios
      .post("/admin/sendemail", { email })
      .then((res) => {
        if (res.data.result) {
          setOpenSuccess(true);
          setEmail("");
        } else {
          setOpenError(true);
        }
      })
      .catch(({ response }) => {
        setOpenError(true);
        console.log(response?.data);
      });
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  return (
    <div class="main-wrapper">
      {/* <div class="preloader">
        <div class="lds-ripple">
          <div class="lds-pos"></div>
          <div class="lds-pos"></div>
        </div>
      </div> */}
      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          Email does not exists.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Mail has been sent successfully.
          <br />
          Sometimes mail has been landed on your spam!
        </Alert>
      </Snackbar>
      <div
        class="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
        id="auth"
        // style="background:url(../assets/images/big/auth-bg.jpg) no-repeat center center;"
      >
        <div class="auth-box row">
          <div
            class="col-lg-6 col-md-5 modal-bg-img"
            id="modal"
            // style="background-image: url(../assets/images/big/3.jpg);"
          ></div>
          <div class="col-lg-6 col-md-7 bg-white">
            <div class="p-3">
              <div class="text-center">
                <img src={Wrapkit} alt="wrapkit" />
              </div>
              <h2 class="mt-3 text-center">Forgot Password</h2>
              <p class="text-center">
                If you have forgotten your password you can reset it here!
              </p>
              <form class="mt-4">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="uname">
                        Email
                      </label>
                      <input
                        class="form-control"
                        placeholder="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              email: "Email is Required!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              email: "",
                            });
                          }
                        }}
                      />
                      {errors.email && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.email}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-12 text-center">
                    <button
                      onClick={handleSubmit}
                      type="button"
                      class="btn btn-block btn-dark rounded"
                    >
                      Send
                    </button>
                  </div>
                  <div class="col-lg-12 text-center mt-5">
                    <Link to="/login" class="text-warning">
                      <u>Take me back to login!</u>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
