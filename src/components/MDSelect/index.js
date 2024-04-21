import React from "react";
import Select from "@mui/material/Select";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const MDSelect = ({ label, ...props }) => {
  return (
    <Select
      label={label}
      fullWidth
      {...props}
      style={{
        height: "45px",
      }}
    />
  );
};

// Setting default values for the props of MDInput
MDSelect.props = {
  label: " ",
};

// Typechecking props for the MDInput
MDSelect.propTypes = {
  label: PropTypes.string,
};

export default MDSelect;
