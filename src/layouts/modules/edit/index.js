import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTextarea from "components/MDTextarea";
import SearchableSelect from "components/MDSelect/SearchableSelect";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/modules/components/Header";

function EditCourse() {
  const options = [
    { id: 0, name: "Option 0" },
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    { id: 4, name: "Option 4" },
    { id: 5, name: "Option 5" },
    { id: 6, name: "Option 6" },
    { id: 7, name: "Option 7" },
    { id: 8, name: "Option 8" },
    { id: 9, name: "Option 9" },
    { id: 10, name: "Option 10" },
    { id: 11, name: "Option 11" },
    { id: 12, name: "Option 12" },
    { id: 13, name: "Option 13" },
    { id: 14, name: "Option 14" },
    { id: 15, name: "Option 15" },
  ];
  const [formData, setFormData] = useState({
    name: "Introduction", // Example pre-set value
    description: "Some description",
    duration: 2,
    code: "XD2222",
    course: 7,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header state={1}>
        <MDBox mt={5} mb={2}>
          <MDBox component="form" role="form" p={3} pt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="text"
                    name="name"
                    label="Name"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="text"
                    name="code"
                    label="Code"
                    fullWidth
                    value={formData.code}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="number"
                    name="duration"
                    label="Duration in hours"
                    fullWidth
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <SearchableSelect
                    options={options}
                    name="course"
                    val={formData.course}
                    title="Select course"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDTextarea
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDButton variant="gradient" color="dark" type="submit">
                    edit module
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

export default EditCourse;
