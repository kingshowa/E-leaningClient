import React, { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

function CreateVideoContent({ setData }) {
  const [docContent, setDocContent] = useState({});

  // Upload file type
  const handleFileUpload = (event) => {
    docContent.video = event.target.files[0];
    //setData(docContent);
  };

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocContent({ ...docContent, [name]: value });
    //setData(docContent);
  };

  useEffect(() => {
    if (docContent) {
      setData(docContent);
    }
  }, [docContent]);

  return (
    <Grid container spacing={3} pt={3}>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput
            type="file"
            name="videoFile"
            label="Video"
            fullWidth
            onChange={handleFileUpload}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput
            type="text"
            name="caption"
            label="Caption"
            fullWidth
            onChange={handleInputChange}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDButton variant="gradient" color="dark" type="submit">
            save content
          </MDButton>
        </MDBox>
      </Grid>
    </Grid>
  );
}

CreateVideoContent.propTypes = {
  setData: PropTypes.func,
};

export default CreateVideoContent;
