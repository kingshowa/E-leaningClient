// @mui material components
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";

import React from "react";
import PropTypes from "prop-types";
import { Radio } from "@mui/material";
import { CheckBox } from "@mui/icons-material";

function Option({ options, p_index }) {
  return (
    <>
      {options.map((option, index) => (
        <Grid container key={option.id}>
          <Grid item xs={0.5}>
            <CheckBox />
            <MDTypography variant="body2" color="text" fontWeight="light">
              {index + " "}A .
            </MDTypography>
          </Grid>
          <Grid item xs={11}>
            <MDTypography variant="body2" color="text" fontWeight="light">
              {option.type + " "} Option data here....
            </MDTypography>
          </Grid>
          {/* {image && (
        <Grid item xs={12} md={5}>
          <MKBox mr={4}>
            <CardMedia
              component="img"
              src={image}
              sx={{
                maxWidth: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </MKBox>
        </Grid>
      )} */}
        </Grid>
      ))}
    </>
  );
}

Option.propTypes = {
  p_index: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      data: PropTypes.string,
      isCorrect: PropTypes.bool,
    })
  ).isRequired,
};

export default Option;
