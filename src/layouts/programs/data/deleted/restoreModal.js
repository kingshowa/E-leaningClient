import * as React from "react";
//import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Material Dashboard 2 React components
import MDDialog from "components/MDDialog";
import MDTypography from "components/MDTypography";

// @mui material components
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

import { fetchObjects, restoreObject } from "api.js";
import { useAuth } from "context/authContext";

function AlertDialog({ name, restore, id, setData, parent_id }) {
  const { token } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRestore = () => {
    let url = "program/restore/" + id;
    let loader = "admin/programs";

    const restoreData = async () => {
      try {
        const data = await restoreObject(url, token);
        console.log(data.message);
        await fetchData();
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };

    restoreData();

    const fetchData = async () => {
      try {
        const data = await fetchObjects(loader, token); // to be made dynamic
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };

    console.log(name + "has been deleted. ID: " + id);
    setOpen(false);
  };

  const textStyle = {
    color: "gray",
  };

  return (
    <>
      <MDTypography component="a" onClick={handleClickOpen} color="text">
        <Icon fontSize="small">restore</Icon>
      </MDTypography>
      <MDDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={textStyle}>
          {"Restore this " + name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={textStyle}>
            Are you sure you want to restore this {name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleRestore()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </MDDialog>
    </>
  );
}

AlertDialog.propTypes = {
  name: PropTypes.string.isRequired,
  restore: PropTypes.bool,
  id: PropTypes.number.isRequired,
  setData: PropTypes.func,
  parent_id: PropTypes.number,
};

export default AlertDialog;
