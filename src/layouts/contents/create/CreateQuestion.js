import ReactDOM from "react-dom";
import React, { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { MenuItem } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDSelect from "components/MDSelect";
import MDTextarea from "components/MDTextarea";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import CreateImageOption from "layouts/contents/create/CreateImageOption";
import CreateTextOption from "layouts/contents/create/CreateTextOption";

function CreateContent() {
  const [optionType, setOptionType] = useState("");
  const [optionsNum, setOptionsNum] = useState(0);

  const handleChange = (event) => {
    setOptionType(event.target.value);
  };

  const handleChange1 = (event) => {
    setOptionsNum(event.target.value);
  };

  const renderContent = () => {
    switch (optionType) {
      case "image":
        return (
          <>
            {Array.from({ length: optionsNum }, (_, index) => (
              <CreateImageOption
                key={index + 1}
                index={index + 1}
                disabled={false}
                questionId={1}
              />
            ))}
          </>
        );
      case "text":
        return (
          <>
            {Array.from({ length: optionsNum }, (_, index) => (
              <CreateTextOption key={index + 1} index={index + 1} disabled={false} questionId={1} />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card id="delete-account">
              <MDBox px={3} pt={2}>
                <MDTypography variant="h6" fontWeight="medium">
                  Create New Question
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" p={3} pt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MDBox my={1}>
                      <MDTextarea name="context" label="Question" />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox my={1}>
                      <MDInput type="file" name="image" label="Image" fullWidth />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox my={1}>
                      <MDSelect defaultValue=" " onChange={handleChange}>
                        <MenuItem value=" ">Select options type</MenuItem>
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="image">Image</MenuItem>
                      </MDSelect>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox my={1}>
                      <MDSelect defaultValue=" " onChange={handleChange1}>
                        <MenuItem value=" ">Select options #</MenuItem>
                        <MenuItem value="2">Two Options</MenuItem>
                        <MenuItem value="3">Three Options</MenuItem>
                        <MenuItem value="4">Four Options</MenuItem>
                        <MenuItem value="5">Five Options</MenuItem>
                      </MDSelect>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox my={1}>
                      <MDButton variant="gradient" color="dark">
                        create question
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={1} pb={2}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card id="delete-account">
              <MDBox px={3} pt={2}>
                <MDTypography variant="h6" fontWeight="medium">
                  Create Options
                </MDTypography>
              </MDBox>
              <MDBox px={3} mb={3}>
                {renderContent()}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateContent;
