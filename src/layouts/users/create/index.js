import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSelect from "components/MDSelect";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { postData } from "api.js";
import { useAuth } from "context/authContext";

function CreateUser() {
  const { token } = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data != null && isVerified) {
      const url = "auth/admin/register";
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
  };

  const verifyPassword = (e) => {
    const value = e.target.value;
    const selector = document.querySelector("#verify");
    if (data != null)
      if (value === data.password) {
        setIsVerified(true);
        selector.style.color = "green";
      } else {
        setIsVerified(false);
        selector.style.color = "red";
      }
  };

  useEffect(() => {
    if (isSaved) {
      // Perform navigation after state change
      navigate("/users"); // Navigate to another page
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
                  Create New User
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" onSubmit={handleSubmit} p={3} pt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="text"
                        name="name"
                        label="First Name"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="text"
                        name="surname"
                        label="Last Name"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDSelect defaultValue=" " name="role" onChange={handleInputChange}>
                        <MenuItem value=" ">-- Select Role --</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </MDSelect>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="email"
                        name="email"
                        label="Email"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="password"
                        name="password"
                        label="Password"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="password"
                        label="Verify Password"
                        onChange={verifyPassword}
                        fullWidth
                      />
                      <MDTypography color="text" fontWeight="regular" variant="h6" id="verify">
                        {isVerified ? "Password verified" : "Password not verified"}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDButton variant="gradient" color="dark" type="submit">
                        create new user
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

export default CreateUser;
