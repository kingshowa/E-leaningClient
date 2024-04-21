import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTextarea from "components/MDTextarea";
import MDSelect from "components/MDSelect";
import SearchableSelect from "components/MDSelect/SearchableSelect";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { postData, fetchObjects } from "api.js";

function CreateCourse() {
  const [data, setData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // selected value from Searchable selection
  const [selectedValue, setSelectedValue] = useState(0);
  const [teachers, setTeachers] = useState();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchObjects("teachers");
        setTeachers(data1.teachers);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, []);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    data.assigned_to = selectedValue;
    if (data != null) {
      const url = "course";
      const saveData = async () => {
        try {
          const responseData = await postData(data, url);
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
    //setData(null);
    // perfom save operations
  };

  // Upload file type
  const handleFileUpload = (event) => {
    // get the selected file from the input
    data.photo = event.target.files[0];
    console.log(data);
  };

  useEffect(() => {
    if (isSaved) {
      // Perform navigation after state change
      window.location.href = "/courses"; // Navigate to another page
    }
  }, [isSaved]);

  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
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
                  Create New Course
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" onSubmit={handleSubmit} p={3} pt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="text"
                        name="name"
                        label="Name"
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
                        label="Code"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDSelect defaultValue=" " name="level" onChange={handleInputChange}>
                        <MenuItem value=" ">Select Level</MenuItem>
                        <MenuItem value="beginner">Beginner</MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="advanced">Advanced</MenuItem>
                      </MDSelect>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <SearchableSelect
                        options={teachers}
                        name="teacher"
                        val={0}
                        title="Select responsible teacher"
                        setValue={setSelectedValue}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="text"
                        name="price"
                        label="Price"
                        placeholder="0.00"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="file"
                        name="photo"
                        label="Photo"
                        fullWidth
                        p={2}
                        onChange={handleFileUpload}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox my={1}>
                      <MDTextarea
                        name="description"
                        label="Description"
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <MDBox>
                      <Switch name="enabled" />
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                      >
                        &nbsp;&nbsp;Enable course
                      </MDTypography>
                    </MDBox>
                  </Grid> */}
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDButton variant="gradient" color="dark" type="submit">
                        create new course
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