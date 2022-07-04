// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//dayjs
import dayjs from "dayjs";

//alert
import { warning, alert, permissionError } from "../../util/alert";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import {
  getFalseRedeem,
  getTrueRedeem,
  acceptRedeemRequest,
} from "../../store/redeem/action";

//datatable
import $ from "jquery";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TablePaginationActions from "./TablePagination";

const RedeemTable = (props) => {
  const [data, setData] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const redeem = useSelector((state) => state.redeem.falseRedeem);

  const hasPermission = useSelector((state) => state.admin.user.flag);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setData(redeem);
  }, [redeem]);

  useEffect(() => {
    props.getFalseRedeem();
  }, []);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const redeemRequest = (data) => {
    if (!hasPermission) return permissionError();
    props.acceptRedeemRequest(data._id);
    setOpenSuccess(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = redeem.filter((data) => {
        return (
          data?.user_id.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.paymentGateway?.toUpperCase()?.indexOf(value) > -1 ||
          data?.user_id.country?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(redeem);
    }
  };

  //true redeem

  const [data_, setData_] = useState([]);

  const [page_, setPage_] = useState(0);
  const [rowsPerPage_, setRowsPerPage_] = useState(5);

  const redeem_ = useSelector((state) => state.redeem.trueRedeem);

  const emptyRows_ =
    rowsPerPage_ - Math.min(rowsPerPage_, data_.length - page_ * rowsPerPage_);

  const handleChangePage_ = (event, newPage) => {
    setPage_(newPage);
  };

  const handleChangeRowsPerPage_ = (event) => {
    setRowsPerPage_(parseInt(event.target.value, 10));
    setPage_(0);
  };

  useEffect(() => {
    setData_(redeem_);
  }, [redeem_]);

  useEffect(() => {
    props.getTrueRedeem();
  }, []);
  useEffect(() => {
    props.getTrueRedeem();
  }, [redeem]);

  const handleSearch_ = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = redeem_.filter((data) => {
        return (
          data?.user_id.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.paymentGateway?.toUpperCase()?.indexOf(value) > -1 ||
          data?.user_id.country?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData_(data);
    } else {
      return setData_(redeem_);
    }
  };

  const { howManyCoins, currency } = useSelector(
    (state) => state.setting.setting
  );

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Redeem Request accepted successfully.
          </span>
        </Alert>
      </Snackbar>

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
                    Redeem
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
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-4 float-left">
                    <h3 class="card-title">Pending Redeem Request</h3>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-3 float-right">
                    <form action="">
                      <div class="input-group mb-4 border rounded-pill p-1">
                        <div class="input-group-prepend border-0">
                          <div
                            id="button-addon4"
                            class="btn btn-link text-primary"
                          >
                            <i class="fa fa-search"></i>
                          </div>
                        </div>
                        <input
                          type="search"
                          placeholder="What're you searching for?"
                          aria-describedby="button-addon4"
                          class="form-control bg-none border-0 rounded-pill mr-1"
                          onChange={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3 float-left mb-0"></div>
                </div>
                {/* <hr class=" mb-4" />   */}
                {/* <div class="col-3"> */}

                {/* </div> */}
                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Payment Gateway</th>
                        <th>Coin</th> <th>Rupee</th>
                        <th>Description</th>
                        <th>Country</th>
                        <th>Arrived On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        <Fragment>
                          {(rowsPerPage > 0
                            ? data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : data
                          ).map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {
                                    <img
                                      src={data.user_id.image}
                                      width="70px"
                                      height="70px"
                                      alt="img"
                                      style={{
                                        objectFit: "contain",
                                        borderRadius: "50%",
                                        border: " 1px solid #808080",
                                      }}
                                      class="mr-3"
                                    />
                                  }
                                  {data.user_id.name}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  {data.paymentGateway}
                                </td>
                                <td style={{ paddingTop: 38 }}>{data.coin}</td>
                                <td style={{ paddingTop: 38 }}>
                                  {data.coin / howManyCoins}&nbsp; {currency}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  {data.description}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  {data.user_id.country}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  <button
                                    type="button"
                                    class="btn waves-effect waves-light btn-primary btn-sm"
                                    data-toggle="modal"
                                    // data-target="#country-modal"
                                    style={{ borderRadius: 5 }}
                                    onClick={() => redeemRequest(data)}
                                  >
                                    <i class="fas fa-check"></i> Accept
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="8" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Payment Gateway</th>
                        <th>Coin</th> <th>Rupee</th>
                        <th>Description</th>
                        <th>Country</th>
                        <th>Arrived On</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="py-2">
                  <TablePagination
                    id="pagination"
                    component="div"
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      100,
                      { label: "All", value: -1 },
                    ]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-5">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-4 float-left">
                    <h3 class="card-title">Completed Redeem Request</h3>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-3 float-right">
                    <form action="">
                      <div class="input-group mb-4 border rounded-pill p-1">
                        <div class="input-group-prepend border-0">
                          <div
                            id="button-addon4"
                            class="btn btn-link text-primary"
                          >
                            <i class="fa fa-search"></i>
                          </div>
                        </div>
                        <input
                          type="search"
                          placeholder="What're you searching for?"
                          aria-describedby="button-addon4"
                          class="form-control bg-none border-0 rounded-pill mr-1"
                          onChange={handleSearch_}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3 float-left mb-0"></div>
                </div>
                {/* <hr class=" mb-4" />   */}
                {/* <div class="col-3"> */}

                {/* </div> */}
                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Payment Gateway</th>
                        <th>Coin</th> <th>Rupee</th>
                        <th>Description</th>
                        <th>Country</th>
                        <th>Arrived On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data_.length > 0 ? (
                        <Fragment>
                          {(rowsPerPage_ > 0
                            ? data_.slice(
                                page_ * rowsPerPage_,
                                page_ * rowsPerPage_ + rowsPerPage_
                              )
                            : data_
                          ).map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {
                                    <img
                                      src={data.user_id.image}
                                      width="70px"
                                      height="70px"
                                      alt="img"
                                      style={{
                                        objectFit: "contain",
                                        borderRadius: "50%",
                                        border: " 1px solid #808080",
                                      }}
                                      class="mr-3"
                                    />
                                  }
                                  {data.user_id.name}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  {data.paymentGateway}
                                </td>
                                <td style={{ paddingTop: 38 }}>{data.coin}</td>
                                <td style={{ paddingTop: 38 }}>
                                  {data.coin / howManyCoins}&nbsp; {currency}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  {data.description}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  {data.user_id.country}
                                </td>
                                <td style={{ paddingTop: 38 }}>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="8" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Payment Gateway</th>
                        <th>Coin</th> <th>Rupee</th>
                        <th>Description</th>
                        <th>Country</th>
                        <th>Arrived On</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="py-2">
                  <TablePagination
                    id="pagination"
                    component="div"
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      100,
                      { label: "All", value: -1 },
                    ]}
                    count={data_.length}
                    rowsPerPage={rowsPerPage_}
                    page={page_}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage_}
                    onChangeRowsPerPage={handleChangeRowsPerPage_}
                    ActionsComponent={TablePaginationActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getFalseRedeem,
  getTrueRedeem,
  acceptRedeemRequest,
})(RedeemTable);
