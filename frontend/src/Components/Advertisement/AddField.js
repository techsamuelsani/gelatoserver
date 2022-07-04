import React, { Fragment, useState } from "react";

// Redux
import { connect, useSelector } from "react-redux";
import { editGoogleFbAd } from "../../store/googleFbAd/action";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton, Tooltip } from "@material-ui/core";
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// Icons
import EditIcon from "@material-ui/icons/EditRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import CheckIcon from "@material-ui/icons/Check";
import { permissionError } from "../../util/alert";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldRow: {
    margin: "10px 50px",
    "@media(max-width: 599px) and (min-width: 360px)": {
      margin: "10px 0",
    },
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
}));

const AddField = ({
  value,
  onChange,
  title,
  name,
  mongoID,
  editGoogleFbAd,
}) => {
  const classes = useStyle();

  const [openSuccess, setOpenSuccess] = useState(false);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };
  // console.log(mongoID);
  const handleUpdate = () => {
    if (!hasPermission) return permissionError();
    editGoogleFbAd({ [name]: value }, mongoID);
    setEdit(false);
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Advertisement update successfully.
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <TextField
          className={classes.fieldRow}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          color="primary"
          label={title}
          placeholder={title}
          type="text"
          size="small"
          fullWidth
          disabled={!edit}
        />
        <div className={classes.actions}>
          {edit ? (
            <Fragment>
              <IconButton onClick={handleUpdate}>
                <Tooltip title="Edit">
                  <CheckIcon color="primary" />
                </Tooltip>
              </IconButton>
              <IconButton onClick={handleCancel}>
                <Tooltip title="Close">
                  <CloseIcon color="primary" />
                </Tooltip>
              </IconButton>
            </Fragment>
          ) : (
            <IconButton onClick={handleEdit}>
              <Tooltip title="Edit">
                <EditIcon color="primary" />
              </Tooltip>
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  editGoogleFbAd,
})(AddField);
