import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_CATEGORY_DIALOG } from "../../store/category/types";
import { createNewCategory, editCategory } from "../../store/category/action";

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

const CategoryDialog = (props) => {
  const dispatch = useDispatch();
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const { dialog: open, dialogData, category } = useSelector(
    (state) => state.category
  );

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [isTop, setIsTop] = useState(false);

  const [errors, setError] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setName(dialogData.name);
      setImagePath(baseURL + "/" + dialogData.icon);
      setIsTop(dialogData.isTop);
    }
  }, [dialogData]);

  const removeImage = () => {
    setImageData(null);
    setImagePath(null);
  };

  useEffect(
    () => () => {
      setError({
        name: "",
        image: "",
      });
      setMongoId("");
      setName("");
      setImageData(null);
      setImagePath(null);
      setIsTop(false);
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
    if (!name) {
      const errors = {};

      if (!name) {
        errors.name = "Name can't be a blank!";
      }

      if (!imageData || !imagePath) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }

    if (!mongoId) {
      const index = category.findIndex(
        (category) => category.name.toLowerCase() === name.toLowerCase()
      );
      if (index > -1) {
        return setError({ ...errors, name: "Category already exist." });
      }
      if (!imageData || !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    } else {
      const index = category.find(
        (category) => category.name.toLowerCase() === name.toLowerCase()
      );
      if (index !== undefined) {
        if (index._id === mongoId) {
        } else {
          return setError({ ...errors, name: "Category already exist." });
        }
      }
      if (!imageData && !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    }

    if (!hasPermission) return permissionError();

    const formData = new FormData();
    formData.append("icon", imageData);
    formData.append("name", name);

    if (mongoId) {
      props.editCategory(formData, mongoId);
    } else {
      props.createNewCategory(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_CATEGORY_DIALOG });
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
          {"Category"}
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
                  <label class="float-left">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Magic"
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
                </div>

                <div class="form-group">
                  <label class="float-left">Image</label>
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

export default connect(null, { createNewCategory, editCategory })(
  CategoryDialog
);
