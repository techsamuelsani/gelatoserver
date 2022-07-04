// (window, $);
import React, { useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//plan dialog
import PlanDialog from "../Dialog/planDialog";

//dayjs
import dayjs from "dayjs";

//alert
import { warning, alert, permissionError } from "../../util/alert";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getPlan, deletePlan } from "../../store//plan/action";
import {
  OPEN_PLAN_DIALOG,
  UNSET_CREATE_PLAN_DONE,
  UNSET_UPDATE_PLAN_DONE,
} from "../../store/plan/types";

//datatable
import $ from "jquery";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TablePaginationActions from "./TablePagination";
// import { baseURL } from "../../util/serverPath";

const PlanTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { plan, createDone, updateDone } = useSelector((state) => state.plan);
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
    setData(plan);
  }, [plan]);

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_PLAN_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_PLAN_DONE });
    }
  }, [updateDone, dispatch]);

  // $(document).ready(function () {
  //   // $("#zero_config").DataTable().clear();
  //   $("#zero_config").DataTable();
  //   $(".dataTables_empty").empty();
  // });

  useEffect(() => {
    props.getPlan();
  }, []);

  const handleOpen = () => {
    // if (!hasPermission) return permissionError();
    dispatch({ type: OPEN_PLAN_DIALOG });
  };

  const handleDelete = (id) => {
    if (!hasPermission) return permissionError();
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deletePlan(id);
          alert("Deleted!", `Plan has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (data) => {
    // if (!hasPermission) return permissionError();
    dispatch({ type: OPEN_PLAN_DIALOG, payload: data });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = plan.filter((data) => {
        return data?.googleProductId?.toUpperCase()?.indexOf(value) > -1;
      });
      setData(data);
    } else {
      return setData(plan);
    }
  };

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Plan add successfully.
          </span>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openUpdateSuccess}
        autoHideDuration={3000}
        onClose={handleCloseUpdateSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseUpdateSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Plan update successfully.
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
                    Plan
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
                  <div class="col-6">
                    <h3 class="card-title mb-4">Plan</h3>
                  </div>
                  <div class="col-6">
                    <button
                      type="button"
                      class="btn waves-effect waves-light btn-primary btn-sm float-right"
                      data-toggle="modal"
                      data-target="#country-modal"
                      style={{ borderRadius: 5 }}
                      onClick={handleOpen}
                    >
                      <i class="fas fa-plus"></i> New
                    </button>
                  </div>
                </div>

                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>Coin</th>
                        <th>Rupee</th>
                        {/* <th>Payment Gateway</th> */}
                        <th>Product Id</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        <>
                          {(rowsPerPage > 0
                            ? data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : data
                          ).map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>{data.coin}</td>
                                <td>
                                  {data.rupee}&nbsp;
                                  {/* {data.currency === "INR" ? "₹" : "$"} */}
                                </td>
                                {/* <td>{data.paymentGateway}</td> */}
                                <td>
                                  {data.productId === "null"
                                    ? "-"
                                    : data.productId}
                                </td>
                                <td>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
                                <td>
                                  {dayjs(data.updatedAt).format("DD MMM, YYYY")}
                                </td>

                                <td>
                                  <a
                                    class="ml-3"
                                    onClick={() => handleEdit(data)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i class="fas fa-edit text-primary mr-3"></i>
                                  </a>

                                  <a
                                    onClick={() => handleDelete(data._id)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i class="fas fa-trash-alt text-danger"></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td colSpan="7" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Coin</th>
                        <th>Rupee</th>
                        {/* <th>Payment Gateway</th> */}
                        <th>Product Id</th>
                        <th>Created At</th>
                        <th>Updated At</th>
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
      </div>
      <PlanDialog />
    </>
  );
};

export default connect(null, { getPlan, deletePlan })(PlanTable);
