// (window, $);
import React, { useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//category dialog
import StickerDialog from "../Dialog/stickerDialog";

//dayjs
import dayjs from "dayjs";

//alert
import { warning, alert, permissionError } from "../../util/alert";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import {
  getSticker,
  deleteSticker,
  deleteAllSticker,
} from "../../store/sticker/action";
import {
  OPEN_STICKER_DIALOG,
  UNSET_CREATE_STICKER_DONE,
  UNSET_UPDATE_STICKER_DONE,
} from "../../store/sticker/types";

//datatable
import $ from "jquery";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TablePaginationActions from "./TablePagination";

//server path
import { baseURL } from "../../util/serverPath";

const StickerTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [openDeleteCount, setOpenDeleteCount] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { sticker, createDone, updateDone } = useSelector(
    (state) => state.sticker
  );
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
    setData(sticker);
  }, [sticker]);

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_STICKER_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_STICKER_DONE });
    }
  }, [updateDone, dispatch]);

  // $(document).ready(function () {
  //   $("#zero_config").DataTable();
  //   $(".dataTables_empty").empty();
  // });

  useEffect(() => {
    props.getSticker();
  }, []);

  const handleOpen = () => {
    // if (!hasPermission) return permissionError();
    dispatch({ type: OPEN_STICKER_DIALOG });
  };

  const handleDelete = (id) => {
    if (!hasPermission) return permissionError();
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteSticker(id);
          alert("Deleted!", `Sticker has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (data) => {
    // if (!hasPermission) return permissionError();
    dispatch({ type: OPEN_STICKER_DIALOG, payload: data });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  const handleCloseDeleteCount = () => {
    setOpenDeleteCount(false);
  };

  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const toggleCheckbox = (e, item) => {
    if (e.target.checked) {
      let arr = checkedBoxes;
      arr.push(item._id);
      setCheckedBoxes(arr);
      setOpenDeleteCount(true);
    } else {
      let items = checkedBoxes.filter((items) => items !== item._id);
      setCheckedBoxes(items);
      setOpenDeleteCount(true);
    }
  };

  const handleDeleteAll = (Ids) => {
    if (!hasPermission) return permissionError();
    if (checkedBoxes.length === 0) {
      return alert(
        "Warning!",
        `Please, Select at least one record.`,
        "warning"
      );
    }
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteAllSticker(Ids);
          alert("Deleted!", `Sticker has been deleted!`, "success");
          setSelectAll(false);
        }
      })
      .catch((err) => console.log(err));
  };

  let [selectAll, setSelectAll] = useState(false);

  const handleChange = () => {
    if (!hasPermission) return permissionError();
    selectAll = !selectAll;
    setSelectAll(selectAll);

    if (data.length > 0 && selectAll) {
      let arr = checkedBoxes;
      data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => {
          arr.push(data._id);
        });
      setCheckedBoxes(arr);
      setOpenDeleteCount(true);
    }
    if (!selectAll) {
      setCheckedBoxes([]);
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
            <b>Success!</b> Sticker add successfully.
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
            <b>Success!</b> Sticker update successfully.
          </span>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDeleteCount}
        autoHideDuration={1000}
        onClose={handleCloseDeleteCount}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseDeleteCount} severity="error">
          <span style={{ color: "#184d47" }}>
            <b>{checkedBoxes.length}</b>&nbsp; Records selected.
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
                    Sticker
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
                    <h4 class="card-title mb-4">Sticker</h4>
                  </div>
                  <div class="col-6">
                    {/* <a href="#"> */}
                    <button
                      type="button"
                      class="btn waves-effect waves-light btn-primary btn-sm float-right"
                      data-toggle="modal"
                      // data-target="#country-modal"
                      style={{ borderRadius: 5 }}
                      onClick={handleOpen}
                    >
                      <i class="fas fa-plus"></i> New
                    </button>
                    {/* </a> */}
                  </div>
                </div>
                {/* <button
                  class="btn btn-sm btn-warning text-dark float-left mb-4"
                  // style={{ paddingBottom: 0, borderRadius: 1 }}
                  onClick={handleChange}
                >
                  <input
                    type="checkbox"
                    value="selectAll"
                    checked={selectAll}
                  />
                  <span class="ml-1">Select All</span>
                </button> */}
                <button
                  onClick={() => handleDeleteAll(checkedBoxes)}
                  class="btn btn-sm btn-danger text-white float-left mb-4"
                  // style={{ borderRadius: 1 }}
                >
                  <i class="fas fa-trash mr-1"></i>Delete All
                </button>
                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>
                          <div
                            class="float-left"
                            // style={{ paddingBottom: 0, borderRadius: 1 }}
                            onClick={handleChange}
                          >
                            <input
                              type="checkbox"
                              value="selectAll"
                              checked={selectAll}
                            />
                          </div>
                        </th>
                        <th>Sticker</th>
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
                                <td>
                                  <input
                                    type="checkbox"
                                    className="selectsingle"
                                    value={data._id}
                                    checked={checkedBoxes.find((p) => {
                                      return p === data._id;
                                    })}
                                    onChange={(e) => toggleCheckbox(e, data)}
                                  />
                                </td>
                                <td>
                                  {
                                    <img
                                      src={baseURL + "/" + data.sticker}
                                      width="70px"
                                      height="70px"
                                      alt="img"
                                      style={{
                                        objectFit: "contain",
                                        borderRadius: "50%",
                                      }}
                                      class="mr-3"
                                    />
                                  }
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
                          <td colSpan="5" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>#</th>
                        <th>Sticker</th>
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
      <StickerDialog />
    </>
  );
};

export default connect(null, { getSticker, deleteSticker, deleteAllSticker })(
  StickerTable
);
