import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

import { fetchObjects, postData } from "api.js";
import { useAuth } from "context/authContext";

function Overview() {
  const navigate = useNavigate();
  const { token } = useAuth();

  // Get params from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = Number(searchParams.get("id"));
  const state = Number(searchParams.get("state"));

  const [data, setData] = useState();
  const [data1, setData1] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  const [toggleState, setToggleState] = useState(state);

  // fetch data
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data1 = await fetchObjects("user", token);
      setData(data1.user);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  };

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setIsSaved(false);
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setData1({ ...data1, [name]: value });
    console.log(data1);
  };

  const handleFileUpload = (event) => {
    // get the selected file from the input
    data.photo = event.target.files[0];
    setIsSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data != null && !isSaved) {
      const url = "user";
      const saveData = async () => {
        try {
          const responseData = await postData(data, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          setIsSaved(true);
          setToggleState(0);
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
    if (data1 != null)
      if (value === data1.password) {
        setIsVerified(true);
        selector.style.color = "green";
      } else {
        setIsVerified(false);
        selector.style.color = "red";
      }
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    console.log(data1);
    if (data1 != null && isVerified) {
      const url = "auth/reset";
      const saveData = async () => {
        try {
          const responseData = await postData(data1, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          navigate("/authentication/sign-in");
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
  };

  return isLoading ? (
    <div>
      <p>Loading</p>
    </div>
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header state={toggleState} setToggleState={setToggleState}>
        {/* View content */}
        <MDBox mt={5} mb={2} className={toggleState == 0 ? "active-content" : "content"}>
          <ProfileInfoCard
            photo={data.photo}
            name={data.name + " " + data.surname}
            role={data.role}
            title="profile information"
            info={{
              firstName: data.name,
              lastName: data.surname,
              email: data.email,
              Role: data.role,
              DateOfBirth: data.date_of_birth,
            }}
            action={{ route: "", tooltip: "Edit Profile" }}
            shadow={false}
          />
        </MDBox>
        {/* Edit content */}
        <MDBox mt={3} mb={2} className={toggleState == 1 ? "active-content" : "content"}>
          <MDBox component="form" role="form" onSubmit={handleSubmit} p={3} pt={2}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MDBox my={1}>
                  <MDInput
                    type="text"
                    name="name"
                    label="First Name"
                    value={data.name}
                    onChange={handleInputChange}
                    fullWidth
                    variant="standard"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={6}>
                <MDBox my={1}>
                  <MDInput
                    type="text"
                    name="surname"
                    label="Last Name"
                    value={data.surname}
                    onChange={handleInputChange}
                    fullWidth
                    variant="standard"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={6}>
                <MDBox my={1}>
                  <MDInput
                    type="date"
                    name="date_of_birth"
                    label="Date of birth"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="file"
                    name="imageUrl"
                    label="Profile Photo"
                    fullWidth
                    onChange={handleFileUpload}
                    variant="standard"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={3}>
                <MDBox my={1}>
                  <MDButton variant="gradient" color="dark" type="submit">
                    save profile
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        {/* Edit content */}
        <MDBox mt={3} mb={2} className={toggleState == 2 ? "active-content" : "content"}>
          <MDBox component="form" role="form" onSubmit={handleSubmit1} p={3} pt={2}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MDBox my={1}>
                  <MDInput
                    type="password"
                    name="old_password"
                    label="Old Password"
                    onChange={handleInputChange1}
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={6}>
                <MDBox my={1}>
                  <MDInput
                    type="password"
                    label="New Password"
                    name="password"
                    fullWidth
                    onChange={handleInputChange1}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={6}>
                <MDBox my={1}>
                  <MDInput
                    type="password"
                    label="Verify New Password"
                    onChange={verifyPassword}
                    fullWidth
                  />
                  <MDTypography color="text" fontWeight="regular" variant="h6" id="verify">
                    {isVerified ? "Password verified" : "Password not verified"}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDButton variant="gradient" color="dark" type="submit">
                    save new password
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

export default Overview;
