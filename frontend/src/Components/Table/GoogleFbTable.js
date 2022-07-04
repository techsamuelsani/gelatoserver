import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

//react-router-dom
import { Link, NavLink } from "react-router-dom";

import GoogleAd from "../Advertisement/GoogleAd";
import FacebookAd from "../Advertisement/FacebookAd";

const GoogleFbAd = () => {
  const updateDone = useSelector((state) => state.googleFbAd.updateDone);

  return (
    <>
      <div class="page-breadcrumb">
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
                    Advertisement
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card p-0 p-xl-5">
              <div class="card-body" style={{ overflow: "auto" }}>
                <div>
                  <GoogleAd />
                </div>
                <div class="mt-5">
                  <FacebookAd />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleFbAd;
