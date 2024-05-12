// @mui material components
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";

import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageOption from "../ImageOption";
import TextOption from "../TextOption";

function Options({ options, p_index, setData, isSaved }) {
  return (
    <>
      {options[0].type === "text" &&
        options.map((option, index) => (
          <MKBox key={option.id}>
            <TextOption
              index={index}
              p_index={p_index}
              option={option}
              setData={setData}
              isSaved={isSaved}
            />
          </MKBox>
        ))}
      {options[0].type === "image" && (
        <Grid container spacing={2}>
          {options.map((option, index) => (
            <Grid item xs={12} md={6} key={option.id}>
              <ImageOption
                index={index}
                p_index={p_index}
                option={option}
                setData={setData}
                isSaved={isSaved}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

Options.propTypes = {
  p_index: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      data: PropTypes.string,
      isCorrect: PropTypes.bool,
    })
  ).isRequired,
};

export default Options;
