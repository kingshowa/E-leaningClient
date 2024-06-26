import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTextarea from "components/MDTextarea";
import SearchableSelect from "components/MDSelect/SearchableSelect";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { postData, fetchObjects } from "api.js";
import { useAuth } from "context/authContext";

function CreateCourse() {
  const navigate = useNavigate();
  const { token } = useAuth();

  // Get params from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = Number(searchParams.get("id"));

  const [data, setData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data != null) {
      if (id != 0) data.parent_course = id;
      const url = "module";
      const saveData = async () => {
        try {
          const responseData = await postData(data, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          setIsSaved(true);
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
    console.log(data);
  };

  useEffect(() => {
    if (isSaved) {
      // Perform navigation after state change
      navigate(id != 0 ? "/courses/course?id=" + id : "/modules"); // Navigate to another page
    }
  }, [isSaved]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card id="delete-account">
              <MDBox
                px={3}
                py={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" fontWeight="medium">
                  Create New Module
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" onSubmit={handleSubmit} p={3} pt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="text"
                        name="name"
                        label="Name *"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="text"
                        name="code"
                        label="Code *"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDTextarea
                        name="description"
                        label="Description *"
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="text"
                        name="duration"
                        label="Duration * (Hours)"
                        fullWidth
                        placeholder="0.00"
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}></MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDButton variant="gradient" color="dark" type="submit">
                        create new module
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateCourse;
