// @mui material components
import CardMedia from "@mui/material/CardMedia";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";

import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckBox from "@mui/material/Checkbox";

function Option({ option, p_index, index, setData, isSaved }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setData((prevData) => {
      const newData = { ...prevData };
      const question = newData.questions[p_index];
      const optionToUpdate = question.options[index];
      // Update the option
      optionToUpdate.answer = !isChecked ? 1 : 0;
      return newData;
    });
    setIsChecked(!isChecked);
  };

  return (
    <>
      <MKBox display="flex" ml="6%">
        <MKBox display="flex" pt={2}>
          <MKBox mt={-1}>
            <CheckBox
              checked={isSaved ? option.isCorrect : isChecked}
              onChange={() => handleChange()}
              disabled={isSaved}
            />
          </MKBox>
          <MDTypography variant="body2" color="text" fontWeight="regular" mt={-0.3}>
            &nbsp;&nbsp;{String.fromCharCode(65 + index)}.&nbsp;&nbsp;
          </MDTypography>
        </MKBox>
        <MKBox mr="5%">
          <CardMedia
            component="img"
            src={option.data}
            sx={{
              maxWidth: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </MKBox>
      </MKBox>
    </>
  );
}

Option.propTypes = {
  p_index: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  option: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    data: PropTypes.string,
    isCorrect: PropTypes.bool,
  }).isRequired,
};

export default Option;
