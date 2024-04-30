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

import quiz from "assets/json/quiz.json";

import { fetchObjects, deleteObject } from "api.js";
import { useAuth } from "context/authContext";

function AlertDialog({ name, restore, id, setData, parent_id, user }) {
  const { token } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    let url = "";
    let loader = "";
    if (parent_id === "") {
      url = "course/delete/" + id;
      loader = "courses/manage";
    } else if (user) {
      url = "user/delete/" + id + "/" + parent_id;
      loader = "user/courses/" + parent_id;
    } else {
      url = "program/delete/" + id + "/" + parent_id;
      loader = "program/courses/" + parent_id;
    }

    const deleteData = async () => {
      try {
        const data = await deleteObject(url, token);
        console.log(data.message);
        await fetchData();
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };

    deleteData();

    const fetchData = async () => {
      try {
        const data = await fetchObjects(loader, token); // to be made dynamic
        setData(parent_id != "" ? data.program : data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };

    //update data fetched from api
    //setData(quiz.questions[0]);
    console.log(name + "has been deleted. ID: " + id);
    setOpen(false);
  };

  const textStyle = {
    color: "gray",
  };

  return (
    <>
      <MDTypography component="a" onClick={handleClickOpen} color="text">
        <Icon fontSize="small">delete</Icon>
      </MDTypography>
      <MDDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={textStyle}>
          {"Delete this " + name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={textStyle}>
            Deleted {name}s can {restore ? "be restored" : " not be restored"}. Are you sure you
            want to delete this {name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleDelete()} autoFocus>
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
  user: PropTypes.bool,
};

export default AlertDialog;
