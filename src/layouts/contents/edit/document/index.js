import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Data
import contents from "assets/json/contents.json";

function EditContent() {
  // Get params from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const state = Number(searchParams.get("state"));

  const [data, setData] = useState(contents[4]); // change data with actual

  // togle tabs
  const [toggleState, setToggleState] = useState(state);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    // perfom save operations
  };

  // Upload file type
  const handleFileUpload = (event) => {
    // get the selected file from the input
    data.link = event.target.files[0];
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox position="relative" my={3}>
        <Card
          sx={{
            position: "relative",
            mt: 2,
            py: 2,
            px: 2,
          }}
        >
          <MDBox mt={5} mb={2}>
            <MDBox component="form" role="form" onSubmit={handleSubmit} p={3} pt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <MDInput
                      type="text"
                      name="title"
                      label="Title"
                      fullWidth
                      value={data.title}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <MDInput
                      type="file"
                      name="document"
                      label="Document file"
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
                      value={data.caption}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <input type="hidden" name="type" value="document" />
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <MDButton variant="gradient" color="dark" type="submit">
                      save document
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditContent;
