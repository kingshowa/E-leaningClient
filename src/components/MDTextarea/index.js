import React from "react";
import TextField from "@mui/material/TextField";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const MDTextarea = ({ label, ...props }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      multiline // Enable multiline input
      rows={2} // Customize number of rows
      {...props}
    />
  );
};

// Setting default values for the props of MDInput
MDTextarea.props = {
  label: " ",
};

// Typechecking props for the MDInput
MDTextarea.propTypes = {
  label: PropTypes.string,
};

export default MDTextarea;
