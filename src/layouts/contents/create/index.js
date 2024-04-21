import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
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

import { postData, fetchObjects } from "api.js";

function CreateContent() {
  const [contentType, setContentType] = useState("");
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
    //data.assigned_to = selectedValue;
    if (data != null) {
      const url = "course////////";
      // const saveData = async () => {
      //   try {
      //     const responseData = await postData(data, url);
      //     console.log("Data saved successfully:", responseData);
      //     // Navigate to another page after successful data saving
      //     setIsSaved(true);
      //   } catch (error) {
      //     console.error("Error posting data:", error.message);
      //   }
      // };
      // saveData();
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

  const handleChange = (event) => {
    setContentType(event.target.value);
  };

  const renderContent = (e) => {
    // const { name, value } = e.target;
    // setData({ ...data, [name]: value });
    // console.log(data);

    switch (contentType) {
      case "linked_video":
        return <CreateLinkedVideoContent />;
      case "video":
        return <CreateUploadedVideoContent />;
      case "image":
        return <CreateImageContent />;
      case "document":
        return <CreateDocumentContent />;
      case "text":
        return <CreateTextContent />;
      case "quize":
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
              <MDBox component="form" role="form" onSubmit={handleSubmit} p={3} pt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDInput
                        type="text"
                        name="title"
                        label="Title"
                        fullWidth
                        onChange={handleInputChange}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox my={1}>
                      <MDSelect defaultValue=" " onChange={handleChange} name="type">
                        <MenuItem value=" ">Select content type</MenuItem>
                        <MenuItem value="text">Reading</MenuItem>
                        {/* <MenuItem value="linked_video">Link Video</MenuItem> */}
                        <MenuItem value="video">Upload Video</MenuItem>
                        <MenuItem value="document">Document</MenuItem>
                        <MenuItem value="image">Image</MenuItem>
                        <MenuItem value="quize">Quiz</MenuItem>
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
