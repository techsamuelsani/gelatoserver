import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//dropzone
import DropZone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_GIFT_DIALOG } from "../../store/gift/types";
import { createNewGift, editGift } from "../../store/gift/action";
import { getCategory } from "../../store/category/action";

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

const GiftDialog = (props) => {
  const dispatch = useDispatch();
  const { dialog: open, dialogData, gift } = useSelector((state) => state.gift);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const Categories = useSelector((state) => state.category.category);
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [coin, setCoin] = useState(0);
  const [category, setCategory] = useState("");

  const [errors, setError] = useState({
    coin: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    props.getCategory();
  }, []);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setCoin(dialogData.coin);
      setCategory(dialogData.category._id);
      setImagePath(baseURL + "/" + dialogData.icon);
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
        category: "",
      });
      setMongoId("");
      setCoin(0);
      setCategory("");
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

    if (!coin || !category) {
      const errors = {};

      if (!coin) {
        errors.coin = "Coin can't be a blank!";
      }
      if (!category) {
        errors.category = "Category can't be a blank!";
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
        return setError({ ...errors, image: "Please select an Image!" });
      }
    }

    if (!hasPermission) return permissionError();

    const formData = new FormData();

    if (mongoId) {
      console.log(imageData);
      formData.append("icon", imageData);
    } else {
      for (let i = 0; i < images.length; i++) {
        formData.append("icon", images[i]);
      }
    }
    formData.append("coin", coin);
    formData.append("category", category);

    if (mongoId) {
      props.editGift(formData, mongoId);
    } else {
      props.createNewGift(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_GIFT_DIALOG });
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
          {"Gift"}
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
                    <label class="float-left">Icon</label>
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
                  <div class="row">
                    <div class="col-md-6">
                      <label class="float-left">Coin</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Magic"
                        required
                        value={coin}
                        onChange={(e) => {
                          setCoin(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              coin: "coin can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              coin: "",
                            });
                          }
                        }}
                      />
                      {errors.coin && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.coin}
                          </Typography>
                        </div>
                      )}
                    </div>
                    <div class="col-md-6">
                      <label class="float-left">Category</label>

                      <select
                        class="form-select form-control"
                        aria-label="Default select example"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              category: "Please select a Category!",
                            });
                          } else if (e.target.value == "Category") {
                            return setError({
                              ...errors,
                              category: "Please select a Category!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              category: "",
                            });
                          }
                        }}
                      >
                        <option selected>Category</option>
                        {Categories.map((category) => {
                          return (
                            <option value={category._id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                      {errors.category && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.category}
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

export default connect(null, { createNewGift, editGift, getCategory })(
  GiftDialog
);
