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
import { useAuth } from "context/authContext";

function CreateOption({ questionId, index, disabled = false }) {
  const { token } = useAuth();

  const [data, setData] = useState({
    image: null,
    isCorrect: 0,
  });

  const [isSaved, setIsSaved] = useState(false);

  const [isDisabled, setIsDisabled] = useState(disabled);
  const handleDisableInput = () => {
    setIsDisabled(true); // Set state to disable input fields
  };
  const handleChange = (event) => {
    const newData = { ...data };
    newData[event.target.name] = event.target.checked ? 1 : 0;
    setData(newData);
    console.log(newData);
  };

  const handleFileUpload = (event) => {
    // get the selected file from the input
    data.image = event.target.files[0];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.image != null && questionId != null && !isSaved) {
      const url = "option/" + questionId;
      const saveData = async () => {
        try {
          const responseData = await postData(data, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          setIsSaved(true);
          handleDisableInput();
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} pt={2}>
        <Grid item xs={12} md={8}>
          <MDBox my={1}>
            <MDInput
              className={"imgOpt" + index}
              onChange={handleFileUpload}
              type="file"
              name="image"
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
              onChange={handleChange}
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
            <MDButton className={"imgOpt" + index} variant="gradient" color="dark" type="submit">
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
  disabled: PropTypes.bool,
};

export default CreateOption;
