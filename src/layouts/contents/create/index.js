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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import CreateLinkedVideoContent from "layouts/contents/create/CreateLinkedVideoContent";
import CreateUploadedVideoContent from "layouts/contents/create/CreateUploadedVideoContent";
import CreateImageContent from "layouts/contents/create/CreateImageContent";
import CreateDocumentContent from "layouts/contents/create/CreateDocumentContent";
import CreateTextContent from "layouts/contents/create/CreateTextContent";
import CreateQuizContent from "layouts/contents/create/CreateQuizContent";

function CreateContent() {
  const [contentType, setContentType] = useState("");

  const handleChange = (event) => {
    setContentType(event.target.value);
  };

  const renderContent = () => {
    switch (contentType) {
      case "linked_video":
        return <CreateLinkedVideoContent />;
      case "uploaded_video":
        return <CreateUploadedVideoContent />;
      case "image":
        return <CreateImageContent />;
      case "document":
        return <CreateDocumentContent />;
      case "text":
        return <CreateTextContent />;
      case "quiz":
        return <CreateQuizContent />;
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
              <MDBox
                px={3}
                py={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" fontWeight="medium">
                  Create New Content
                </MDTypography>
              </MDBox>
              <MDBox component="form" role="form" p={3} pt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput type="text" name="title" label="Title" fullWidth />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDSelect defaultValue=" " onChange={handleChange}>
                        <MenuItem value=" ">Select content type</MenuItem>
                        <MenuItem value="text">Reading</MenuItem>
                        <MenuItem value="linked_video">Link Video</MenuItem>
                        <MenuItem value="uploaded_video">Upload Video</MenuItem>
                        <MenuItem value="document">Document</MenuItem>
                        <MenuItem value="image">Image</MenuItem>
                        <MenuItem value="quiz">Quiz</MenuItem>
                      </MDSelect>
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox id="render_content_type">{renderContent()}</MDBox>
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
