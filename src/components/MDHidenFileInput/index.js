import * as React from "react";
import { styled } from "@mui/material/styles";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

import PropTypes from "prop-types";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ onFileChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <MDButton
      color="info"
      iconOnly
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
    >
      <Icon>cloudUpload</Icon>
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </MDButton>
  );
}

InputFileUpload.propTypes = {
  onFileChange: PropTypes.func,
};
