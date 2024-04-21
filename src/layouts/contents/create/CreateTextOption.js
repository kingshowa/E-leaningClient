// @mui material components
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";
import PropTypes from "prop-types";

function CreateOption({ questionId, index, disabled = false }) {
  const [data, setData] = useState({
    data: "",
    isCorrect: false,
    questionId: questionId,
  });
  const [isDisabled, setIsDisabled] = useState(disabled);
  const handleDisableInput = () => {
    setIsDisabled(true); // Set state to disable input fields
  };
  const handleChange = (event) => {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
    console.log(newData);
  };

  const handleChange1 = (event) => {
    const newData = { ...data };
    newData[event.target.name] = event.target.checked;
    setData(newData);
    console.log(newData);
  };

  const handleSubmit = () => {};

  return (
    <form>
      <Grid container spacing={2} pt={2}>
        <Grid item xs={12} md={8}>
          <MDBox my={1}>
            <MDInput
              className={"imgOpt" + index}
              onChange={handleChange}
              type="text"
              name="data"
              label={"Option " + index}
              fullWidth
              disabled={isDisabled}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={2}>
          <MDBox my={1}>
            <Switch
              className={"imgOpt" + index}
              onChange={handleChange1}
              name="isCorrect"
              disabled={isDisabled}
            />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Correct?
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={2}>
          <MDBox my={1}>
            <MDButton
              className={"imgOpt" + index}
              variant="gradient"
              color="dark"
              onClick={handleDisableInput}
            >
              save
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </form>
  );
}

// Typechecking props for the
CreateOption.propTypes = {
  questionId: PropTypes.number,
  index: PropTypes.number,
  disabled: PropTypes.boolean,
};

export default CreateOption;
