import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//dropzone
import DropZone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_IMAGE_DIALOG } from "../../store/image/types";
import { createNewImage, editImage } from "../../store/image/action";
import { getCountry } from "../../store/country/action";

//server path
import { baseURL } from "../../util/serverPath";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//custom javascript
import "../../dist/js/custom.min.js";
import "../../dist/js/app-style-switcher";
import "../../dist/js/sidebarmenu";
import "../../dist/js/feather.min.js";
import "../../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";

//icon
import Cancel from "@material-ui/icons/Cancel";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";

//dialog
import Dialog from "@material-ui/core/Dialog";

const ImageDialog = (props) => {
  const dispatch = useDispatch();
  const { dialog: open, dialogData, image } = useSelector(
    (state) => state.image
  );

  const hasPermission = useSelector((state) => state.admin.user.flag);

  const Countries = useSelector((state) => state.country.country);
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const [errors, setError] = useState({
    name: "",
    image: "",
    country: "",
  });

  useEffect(() => {
    props.getCountry();
  }, []);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setName(dialogData.name);
      setCountry(dialogData.country._id);
      setImagePath(baseURL + "/" + dialogData.image);
    }
  }, [dialogData]);

  const removeImage = () => {
    setImageData(null);
    setImagePath(null);
  };

  useEffect(
    () => () => {
      setError({
        coin: "",
        image: "",
        country: "",
      });
      setMongoId("");
      setName("");
      setCountry("");
      setImages([]);
      setImageData(null);
      setImagePath(null);
    },
    [open]
  );

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !country) {
      const errors = {};

      if (!name) {
        errors.name = "Name can't be a blank!";
      }
      if (!country) {
        errors.country = "Country can't be a blank!";
      }
      if (images.length === 0) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }

    if (mongoId) {
      if (!imageData && !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    } else {
      if (images.length === 0) {
        errors.image = "Please select an Image!";
      }
    }
    if (!hasPermission) return permissionError();

    const formData = new FormData();

    if (mongoId) {
      console.log(imageData);
      formData.append("image", imageData);
    } else {
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }
    }
    formData.append("name", name);
    formData.append("country", country);

    if (mongoId) {
      props.editImage(formData, mongoId);
    } else {
      props.createNewImage(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_IMAGE_DIALOG });
  };

  // Payload data and url to upload files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // Return the current status of files being uploaded
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "removed") {
      const filteredItems = images.filter((item) => item !== file);
      setImages(filteredItems);
    }

    if (status === "done") {
      images.push(file);
    }
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title" style={{ marginLeft: 20 }}>
          {"Image"}
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#5E72E4",
          }}
        >
          <Tooltip title="Close">
            <Cancel onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="modal-body pt-1 px-1 pb-3">
            <div class="d-flex flex-column text-center">
              <form>
                <div class="form-group">
                  <div class="form-group">
                    <label class="float-left">Image</label>
                    {!mongoId && (
                      <>
                        <DropZone
                          getUploadParams={getUploadParams}
                          onChangeStatus={handleChangeStatus}
                          accept="image/*"
                        />
                        {errors.image && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {errors.image}
                            </Typography>
                          </div>
                        )}
                      </>
                    )}

                    {mongoId && (
                      <>
                        <input
                          class="form-control"
                          type="file"
                          required=""
                          onChange={handleInputImage}
                        />
                        {errors.image && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {errors.image}
                            </Typography>
                          </div>
                        )}
                        {imagePath && (
                          <Fragment>
                            <div class="row">
                              <img
                                src={imagePath}
                                class="mt-3 ml-3 rounded mb-2"
                                height="100px"
                                width="100px"
                              />
                              <div
                                class="img-container"
                                style={{
                                  display: "inline",
                                  position: "relative",
                                  float: "left",
                                }}
                              >
                                <i
                                  class="fas fa-times-circle material-icons remove_img text-primary"
                                  style={{
                                    position: "absolute",
                                    right: "-6px",
                                    top: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={removeImage}
                                ></i>
                              </div>
                            </div>
                          </Fragment>
                        )}
                      </>
                    )}
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <label class="float-left">Name</label>
                      <textarea
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        cols={2}
                        rows={2}
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              name: "Name can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              name: "",
                            });
                          }
                        }}
                      />
                      {errors.name && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.name}
                          </Typography>
                        </div>
                      )}
                      {!mongoId && (
                        <div
                          style={{
                            fontSize: 13,

                            textAlign: "left",
                            color: "gray",
                          }}
                        >
                          <span style={{ color: "red" }}>Note:-&nbsp;</span> Add
                          multiple name using comma(,)
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-md-12">
                      <label class="float-left">Country</label>

                      <select
                        class="form-select form-control"
                        aria-label="Default select example"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              country: "Please select a Country!",
                            });
                          } else if (e.target.value == "Country") {
                            return setError({
                              ...errors,
                              country: "Please select a Country!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              country: "",
                            });
                          }
                        }}
                      >
                        <option selected>Country</option>
                        {Countries.map((country) => {
                          return (
                            <option value={country._id}>{country.name}</option>
                          );
                        })}
                      </select>
                      {errors.country && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.country}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { createNewImage, editImage, getCountry })(
  ImageDialog
);
