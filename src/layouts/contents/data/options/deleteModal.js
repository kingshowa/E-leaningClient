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

function AlertDialog({ name, restore, id, setData, parent_id }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    let url = "quize/option/" + id;
    let loader = "";
    // switch (name) {
    //   case "program":
    //     url = "program/delete/" + id;
    //     loader = "programs";
    //   case "course":
    //     url = parent_id === "" ? "program/delete/" + id + "/" + parent_id : "course/delete/" + id;
    //     loader = parent_id === "" ? "courses/manage" : "program/courses/" + parent_id;
    //   case "module":
    //     url = parent_id === "" ? "course/delete/" + parent_id + "/" + id : "module/delete/" + id;
    //     loader = parent_id === "" ? "courses/manage" : "course/modules/" + parent_id;
    //   case "content":
    //     url = "content/delete/" + id;
    //   case "question":
    //     url = "quize/question/" + id;
    //   case "option":

    //   default:
    //     "";
    // }

    const deleteData = async () => {
      try {
        const data = await deleteObject(url);
        console.log(data.message);
        await fetchData();
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };

    deleteData();

    const fetchData = async () => {
      try {
        const data = await fetchObjects("question/" + parent_id); // to be made dynamic
        setData(data.question);
        console.log(data.question);
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
};

export default AlertDialog;
