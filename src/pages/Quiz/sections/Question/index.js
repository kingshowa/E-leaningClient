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
      <Grid item xs={12} md={image ? 6 : 12}>
        <MDTypography variant="body2" color="text" fontWeight="light">
          {index + 1}.&nbsp;&nbsp;{context}
        </MDTypography>
      </Grid>
      {image && (
        <Grid item xs={12} md={6}>
          <MKBox mr="5%">
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
