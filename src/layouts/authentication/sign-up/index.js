// react-router-dom components
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import BasicLayout from "../components/BasicLayout";

import { postData } from "api.js";

function Cover() {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  // Update data management
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
  //console.log(id);
  const handleSubmit = (event) => {
    event.preventDefault();
    data.role = "student";
    console.log(data);
    if (data != null && isVerified) {
      const url = "auth/register";
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
  };

  useEffect(() => {
    if (isSaved) {
      // Perform navigation after state change
      navigate("/authentication/sign-in");
    }
  }, [isSaved]);

  return (
    <BasicLayout image={bgImage}>
      <MDBox mt={5}>
        <Card>
          <MDBox mx={2} p={1} textAlign="center">
            <MDTypography variant="h4" fontWeight="medium" color="info" mt={1}>
              Sign Up
            </MDTypography>
          </MDBox>
          <MDBox pt={1} pb={1} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  name="name"
                  fullWidth
                  onChange={handleInputChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  name="email"
                  fullWidth
                  onChange={handleInputChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  name="password"
                  fullWidth
                  onChange={handleInputChange}
                />
              </MDBox>
              <MDBox mb={2}>
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
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </MDTypography>
                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
              <MDBox mt={3} mb={1}>
                <MDButton variant="gradient" color="info" type="submit" fullWidth>
                  sign up
                </MDButton>
              </MDBox>
              <MDBox mt={2} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </BasicLayout>
  );
}

export default Cover;
