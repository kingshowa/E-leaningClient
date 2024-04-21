import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ImageContentCard from "examples/Cards/ContentCards/ImageContentCard";

// Overview page components
import Header from "layouts/programs/components/Header/Header1";
//css
import "assets/css/style.css";

// Data
import contents from "assets/json/contents.json";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";

function ViewContent() {
  // Get params from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const state = Number(searchParams.get("state"));

  const [data, setData] = useState(contents[3]); // change data with actual

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
      <Header state={toggleState} setToggleState={setToggleState}>
        {/* View content */}
        <MDBox mt={5} mb={2} className={toggleState == 0 ? "active-content" : "content"}>
          <ImageContentCard
            title={data.title}
            image={homeDecor1}
            caption={data.caption}
            shadow={false}
          />
        </MDBox>
        {/* Edit content */}
        <MDBox mt={5} mb={2} className={toggleState == 1 ? "active-content" : "content"}>
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
                    name="link"
                    label="Image file"
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
              <input type="hidden" name="type" value="image" />
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDButton variant="gradient" color="dark" type="submit">
                    save content
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewContent;
