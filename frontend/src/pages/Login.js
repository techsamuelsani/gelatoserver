import React, { useState, useEffect } from "react";

//axios
import axios from "axios";

//router
import { Link } from "react-router-dom";

//redux
import { useSelector, connect } from "react-redux";
import { login } from "../store/admin/action";

import "../dist/css/style.min.css";
import "../dist/css/style.css";

//jquery
import $ from "jquery";

import Wrapkit from "../assets/images/big/icon.png";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { state } from "./Admin";
import { Alert } from "@material-ui/lab";

const LoginPage = (props) => {
  // $(".preloader ").fadeOut();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [openEmailError, setOpenEmailError] = useState(false);
  const [openPasswordError, setOpenPasswordError] = useState(false);
  const [openCoreError, setOpenCoreError] = useState(false);

  const [hasError, setHasError] = useState(false);
  const [core, setCore] = useState(null);
  const [paper, setPaper] = useState(null);
  const [hasAdmin, setHasAdmin] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [errors_, setErrors] = useState({
    core: "",
    paper: "",
  });

  const errors = useSelector((state) => state.admin.loginError);

  useEffect(() => {
    if (typeof errors === "string") {
      setError(errors);
    }
    if (typeof errors === "object") {
      errors.map((error) => {
        if (error?.email) {
          setEmail("");
          setOpenEmailError(true);
          setEmailError(error?.email);
        }

        if (error?.password) {
          setPassword("");
          setOpenPasswordError(true);
          setPasswordError(error?.password);
        }
        return true;
      });
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      const error = {};

      if (!email) {
        error.email = "Email is Required!";
      }
      if (!password) {
        error.password = "Password is Required!";
      }

      return setError({ ...error });
    }

    if (hasAdmin) {
      const errors_ = {};
      if (core === null || paper === null) {
        if (core === null) {
          errors_.core = "This Field Required!";
        }
        if (paper === null) {
          errors_.paper = "This Field is Required!";
        }
        return setErrors({ ...errors_ });
      }
    }

    const data_ = {
      key: core,
      package: paper,
    };
    if (core !== null && paper !== null) {
      await axios
        .post(state, data_)
        .then(async (res) => {
          setHasError(false);
          setHasAdmin(false);
          props.login(email, password, core, paper);
        })
        .catch((error) => {
          console.log(error);
          setHasAdmin(true);
          setCore("");
          setCore(null);
          setPaper("");
          setPaper(null);
          setOpenCoreError(true);
          return setHasError(true);
        });
    } else {
      return props.login(email, password, core, paper);
    }
  };

  useEffect(async () => {
    if (email && password) {
      const data_ = {
        email,
        password,
      };

      return await axios
        .post("/admin/get/admin", data_)
        .then(async (res) => {
          debugger;
          let admin = res.data.data;
          if (admin.flag === true) {
            if (admin.key === null && admin.package === null) {
              setHasAdmin(true);
            } else {
              setCore(admin.key);
              setPaper(admin.package);
              setHasAdmin(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [email, password]);

  const handleCloseError = () => {
    setOpenEmailError(false);
    setOpenPasswordError(false);
    setOpenCoreError(false);
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
        open={openEmailError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {emailError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openPasswordError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {passwordError}
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
              <h2 class="mt-3 text-center">Sign In</h2>
              <p class="text-center">
                Enter your email address and password to access admin panel.
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
                              ...error,
                              email: "Email is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              email: "",
                            });
                          }
                        }}
                      />
                      {error.email && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {error.email}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="pwd">
                        Password
                      </label>
                      <input
                        class="form-control"
                        placeholder="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              password: "Password is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              password: "",
                            });
                          }
                        }}
                      />
                      {error.password && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {error.password}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>

                  {hasAdmin && (
                    <>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="text-dark" for="uname">
                            Key
                          </label>
                          <input
                            class="form-control"
                            placeholder="Key"
                            type="password"
                            required
                            value={core}
                            onChange={(e) => {
                              setCore(e.target.value);
                              if (!e.target.value) {
                                return setErrors({
                                  ...errors_,
                                  core: "This Field is Required!",
                                });
                              } else {
                                return setErrors({
                                  ...errors_,
                                  core: "",
                                });
                              }
                            }}
                          />
                          {errors_.core && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors_.core}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="text-dark" for="uname">
                            Package
                          </label>
                          <input
                            class="form-control"
                            placeholder="package"
                            type="text"
                            required
                            value={paper}
                            onChange={(e) => {
                              setPaper(e.target.value);
                              if (!e.target.value) {
                                return setErrors({
                                  ...errors_,
                                  paper: "This Field is Required!",
                                });
                              } else {
                                return setErrors({
                                  ...errors_,
                                  paper: "",
                                });
                              }
                            }}
                          />
                          {errors_.paper && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors_.paper}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      {hasError && (
                        <Snackbar
                          open={openCoreError}
                          autoHideDuration={3000}
                          onClose={handleCloseError}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <Alert onClose={handleCloseError} severity="error">
                            Incorrect Key or Password !!
                          </Alert>
                        </Snackbar>
                      )}
                    </>
                  )}
                  <div class="col-lg-12 text-center">
                    <button
                      onClick={handleSubmit}
                      type="button"
                      class="btn btn-block btn-dark rounded"
                    >
                      Sign In
                    </button>
                  </div>
                  <div class="col-lg-12 text-center mt-5">
                    <Link to="/forgot" class="text-danger">
                      {/* <a href="/forgot" class="text-danger"> */}
                      <u>Forgot password?</u>
                    </Link>
                    {/* </a> */}
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

export default connect(null, { login })(LoginPage);
