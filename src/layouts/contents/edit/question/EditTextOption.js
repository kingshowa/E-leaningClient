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
import { postData } from "api.js";

function CreateOption({ index, disabled = false, optionData }) {
  const [data, setData] = useState(optionData);

  const handleChange = (event) => {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  };

  const [isDisabled, setIsDisabled] = useState(disabled);
  const handleDisableInput = () => {
    setIsDisabled(true); // Set state to disable input fields
  };

  const handleChange1 = (event) => {
    const newData = { ...data };
    newData[event.target.name] = event.target.checked ? 1 : 0;
    setData(newData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data != null) {
      const url = "quize/option/" + optionData.id;
      const saveData = async () => {
        try {
          const responseData = await postData(data, url);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          //setToggleState(0);
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
    console.log(data); // perfom save
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} pt={2}>
        <Grid item xs={12} md={8}>
          <MDBox my={1}>
            <MDInput
              onChange={handleChange}
              type="text"
              name="data"
              label={"Option " + index}
              fullWidth
              disabled={isDisabled}
              value={data.data}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={2}>
          <MDBox my={1}>
            <Switch
              onChange={handleChange1}
              name="isCorrect"
              disabled={isDisabled}
              checked={data.isCorrect == 1}
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
            <MDButton variant="gradient" color="dark" type="submit">
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
  index: PropTypes.number,
  disabled: PropTypes.bool,
  optionData: PropTypes.object,
};

export default CreateOption;
