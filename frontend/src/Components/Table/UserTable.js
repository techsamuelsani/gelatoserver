// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//alert
import { permissionError } from "../../util/alert";

//server path
import { baseURL } from "../../util/serverPath";

//dayjs
import dayjs from "dayjs";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getUser, blockUnblockUser } from "../../store/user/action";

//datatable
import $ from "jquery";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";

// //datatable
// import "../../assets/extra-libs/datatables.net-bs4/css/dataTables.bootstrap4.css";

// //custom javascript
// import "../../dist/js/custom.min.js";
// import "../../dist/js/app-style-switcher";
// import "../../dist/js/sidebarmenu";
// import "../../dist/js/feather.min.js";
// import "../../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";

const UserTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const user = useSelector((state) => state.user.user);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  // $(document).ready(function () {
  //   // $("#zero_config").DataTable().ajax.reload(null, false);
  //   $("#zero_config")
  //     .DataTable
  //     // pageLength: 5,
  //     // dom: "Bfrtip",
  //     // buttons: ["copy", "csv", "excel", "pdf", "print"],
  //     // stateSave: true,
  //     // pagingType: "full_numbers",
  //     // bDestroy: true,
  //     ();
  //   $(".dataTables_empty").empty();
  // });

  useEffect(() => {
    props.getUser();
  }, []);

  useEffect(() => {
    setData(user);
  }, [user]);

  const blockUnblock = (data) => {
    if (!hasPermission) return permissionError();
    props.blockUnblockUser(data._id);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = user.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.username?.toUpperCase()?.indexOf(value) > -1 ||
          data?.country?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(user);
    }
  };

  return (
    <Fragment>
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
                    User
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
                    <h3 class="card-title">User</h3>
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
                        <th>UserName</th>
                        <th>Coin</th>
                        <th>Followers</th>
                        <th>Following</th>
                        <th>Country</th>
                        <th>Created At</th>
                        <th>Is Block</th>
                        {/* <th>Action</th> */}
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
                                      src={data.image}
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
                                  {data.name}
                                </td>
                                <td>{data.username}</td>
                                <td>{data.coin}</td>
                                <td>{data.followers_count}</td>
                                <td>{data.following_count}</td>
                                <td>{data.country}</td>
                                <td>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
                                <td align="center">
                                  <label class="switch">
                                    <input
                                      type="checkbox"
                                      checked={data.block}
                                      onChange={() => blockUnblock(data)}
                                    />
                                    <span class="slider">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          marginLeft: `${
                                            data.block ? "-25px" : "25px"
                                          }`,
                                          color: "white",
                                          marginTop: "6px",
                                        }}
                                      >
                                        {data.block ? "Yes" : "No"}
                                      </p>
                                    </span>
                                  </label>
                                </td>
                                {/* <td>
                              <a href="#">
                                <i class="fas fa-edit text-primary mr-3"></i>
                              </a>

                              <a href="#">
                                <i class="fas fa-trash-alt text-danger"></i>
                              </a>
                            </td> */}
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
                        <th>UserName</th>
                        <th>Coin</th>
                        <th>Followers</th>
                        <th>Following</th>
                        <th>Country</th>
                        <th>Created At</th>
                        <th>Is Block</th>
                        {/* <th>Action</th> */}
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
    </Fragment>
  );
};

export default connect(null, { getUser, blockUnblockUser })(UserTable);
