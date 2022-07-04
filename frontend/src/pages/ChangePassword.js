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

const ChangePassword = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    setId(props.match.params.id);
  }, [props.match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword || password !== confirmPassword) {
      const errors = {};

      if (!password) {
        errors.password = "Please enter password!";
      }
      if (!confirmPassword) {
        errors.confirmPassword = "Please enter confirm password!";
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = "Password & Confirm Password does not match";
      }

      return setError({ ...errors });
    }
    axios
      .post("/admin/forgotpass/" + id, {
        new_pass: password,
        confirm_pass: confirmPassword,
      })
      .then((res) => {
        setOpenSuccess(true);
        setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  return (
    <div class="main-wrapper">
      <Snackbar
        open={openSuccess}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Password update successfully.
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
              <h2 class="mt-3 text-center">change Password</h2>
              <p class="text-center">
                If you have forgotten your password you can reset it here!
              </p>
              <form class="mt-4">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="uname">
                        New Password
                      </label>
                      <input
                        class="form-control"
                        placeholder="New Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              password: "Please enter password!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              password: "",
                            });
                          }
                        }}
                      />
                      {errors.password && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.password}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="uname">
                        Confirm Password
                      </label>
                      <input
                        class="form-control"
                        placeholder="Confirm Password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              confirmPassword: "Please enter confirm password!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              confirmPassword: "",
                            });
                          }
                        }}
                      />
                      {errors.confirmPassword && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.confirmPassword}
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

export default ChangePassword;
