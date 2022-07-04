import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_STICKER_DIALOG } from "../../store/sticker/types";
import { createNewSticker, editSticker } from "../../store/sticker/action";

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

//dropzone
import DropZone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const StickerDialog = (props) => {
  const dispatch = useDispatch();
  const { dialog: open, dialogData, sticker } = useSelector(
    (state) => state.sticker
  );

  const hasPermission = useSelector((state) => state.admin.user.flag);

  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");

  const [errors, setError] = useState({
    image: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);

      setImagePath(baseURL + "/" + dialogData.sticker);
    }
  }, [dialogData]);

  const removeImage = () => {
    setImageData(null);
    setImagePath(null);
  };

  useEffect(
    () => () => {
      setError({
        image: "",
      });
      setMongoId("");
      setImages([]);
      setImageData(null);
      setImagePath(null);
    },
    [open]
  );

  const handleInputImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      if (e.target.files[0].type !== "image/gif") {
        return setError({ ...errors, image: "Please select Gif Sticker!" });
      }
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

    if (mongoId) {
      if (!imageData && !imagePath) {
        return setError({ ...errors, image: "Please select an Sticker!" });
      }
    } else {
      if (images.length === 0) {
        return setError({ ...errors, image: "Please select an Sticker!" });
      }
    }

    if (!hasPermission) return permissionError();

    const formData = new FormData();

    if (mongoId) {
      formData.append("sticker", imageData);
    } else {
      for (let i = 0; i < images.length; i++) {
        formData.append("sticker", images[i]);
      }
    }

    console.log(images);
    if (mongoId) {
      props.editSticker(formData, mongoId);
    } else {
      props.createNewSticker(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_STICKER_DIALOG });
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
      if (file.type !== "image/gif") {
        return setError({ ...errors, image: "Please select Gif Sticker!" });
      }
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
          {"Sticker"}
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
                      <label class="float-left">Sticker</label>
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
                          <img
                            src={imagePath}
                            class="mt-3 rounded float-left mb-2"
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
                        </Fragment>
                      )}
                    </>
                  )}
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

export default connect(null, { createNewSticker, editSticker })(StickerDialog);
