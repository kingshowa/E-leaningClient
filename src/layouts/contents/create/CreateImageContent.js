import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import PropTypes from "prop-types";

function CreateContent({ setData }) {
  const [docContent, setDocContent] = useState({});

  // Upload file type
  const handleFileUpload = (event) => {
    docContent.image = event.target.files[0];
    setData(docContent);
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
          <MDInput type="file" name="image" label="Image" fullWidth onChange={handleFileUpload} />
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

CreateContent.propTypes = {
  setData: PropTypes.func,
};

export default CreateContent;
