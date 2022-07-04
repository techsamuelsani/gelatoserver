import React, { Fragment, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

//bounce loader
import { BounceLoader } from "react-spinners";

import { Switch, BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import AuthRoute from "./util/AuthRouter";
import PrivateRoute from "./util/PrivateRouter";
import Admin from "./pages/Admin";

import { SET_ADMIN } from "./store/admin/types";

// import UserTable from "./Components/Table/UserTable";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch({ type: SET_ADMIN, payload: token });
  }, [token, dispatch]);
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <BounceLoader
            css={`
              margin: auto;
            `}
            size={60}
            color="#3d4977"
          />
        </div>
      }
    >
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/admin" component={Admin} />
          <AuthRoute exact path="/" component={Login} />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/forgot" component={ForgotPassword} />
          <Route exact path="/change/:id" component={ChangePassword} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
