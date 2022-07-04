// (window, $);
import React, { useEffect, useState } from "react";

//category dialog
import ImageDialog from "../Dialog/imageDialog";

//dayjs
import dayjs from "dayjs";

//alert
import { warning, alert } from "../../util/alert";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getImage, deleteImage } from "../../store/image/action";
import {
  OPEN_IMAGE_DIALOG,
  UNSET_CREATE_IMAGE_DONE,
  UNSET_UPDATE_IMAGE_DONE,
} from "../../store/image/types";

//datatable
import $ from "jquery";
// import DataTable from "datatables.net";
// import dts from "datatables.net-dt";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//datatable
import "../../assets/extra-libs/datatables.net-bs4/css/dataTables.bootstrap4.css";

//custom javascript
import "../../dist/js/custom.min.js";
import "../../dist/js/app-style-switcher";
import "../../dist/js/sidebarmenu";
import "../../dist/js/feather.min.js";
import "../../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";

//MUI
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";

//server path
import { baseURL } from "../../util/serverPath";

const ImageTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  const { image, createDone, updateDone } = useSelector((state) => state.image);

  useEffect(() => {
    setData(image);
  }, [image]);

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_IMAGE_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_IMAGE_DONE });
    }
  }, [updateDone, dispatch]);

  $(document).ready(function () {
    $("#zero_config").DataTable();
    $(".dataTables_empty").empty();
  });

  useEffect(() => {
    props.getImage();
  }, []);

  const handleOpen = () => {
    dispatch({ type: OPEN_IMAGE_DIALOG });
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteImage(id);
          alert("Deleted!", `Image has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (data) => {
    dispatch({ type: OPEN_IMAGE_DIALOG, payload: data });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
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
            <b>Success!</b> Image add successfully.
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
            <b>Success!</b> Image update successfully.
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
                    <a href="index.html" class="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Image
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
                    <h4 class="card-title mb-4">Image</h4>
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

                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Created At</th>
                        <th>Updated At</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {
                                  <img
                                    src={baseURL + "/" + data.image}
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
                              </td>
                              <td>{data.name}</td>
                              <td>{data.country ? data.country.name : null}</td>
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
                        })
                      ) : (
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageDialog />
    </>
  );
};

export default connect(null, { getImage, deleteImage })(ImageTable);
