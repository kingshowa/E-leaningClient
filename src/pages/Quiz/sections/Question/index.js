// @mui material components
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";

import React from "react";
import PropTypes from "prop-types";

function Question({ index, context, image }) {
  return (
    <Grid container>
      <Grid item xs={0.5}>
        <MDTypography variant="body2" color="text" fontWeight="light">
          {index + 1}.
        </MDTypography>
      </Grid>
      <Grid item xs={11.5} md={image ? 6.5 : 11.5}>
        <MDTypography variant="body2" color="text" fontWeight="light">
          {context}
        </MDTypography>
      </Grid>
      {image && (
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
      )}
    </Grid>
  );
}

Question.propTypes = {
  index: PropTypes.number.isRequired,
  context: PropTypes.string,
  image: PropTypes.string,
};

export default Question;
