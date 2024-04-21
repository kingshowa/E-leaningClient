import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Overview page components
import Header from "layouts/programs/components/Header/Header1";
//css
import "assets/css/style.css";

// Data
import contents from "assets/json/contents.json";

function ViewContent() {
  // Get params from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const state = Number(searchParams.get("state"));

  const [data, setData] = useState(contents[5]); // change data with actual /////
  const [editorContent, setEditorContent] = useState(data.data);

  // togle tabs
  const [toggleState, setToggleState] = useState(state);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleEditorChange = (event, editor) => {
    const dataa = editor.getData();
    setEditorContent(dataa);
    data.data = dataa;
  };

  const editorStyle = {
    width: "100%", // Set the desired width
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(data);
    // perfom save operations
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header state={toggleState} setToggleState={setToggleState}>
        {/* View content */}
        <MDBox mt={5} mb={2} className={toggleState == 0 ? "active-content" : "content"}>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={0} px={2}>
            <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize">
              {data.title}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" mt={3} px={2}>
            <MDTypography dangerouslySetInnerHTML={{ __html: data.data }} />
          </MDBox>
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
              <Grid item xs={12} md={6}></Grid>
            </Grid>
            <Grid container spacing={3} pt={3}>
              <MDBox my={1} ml={3} mt={3} style={editorStyle}>
                <CKEditor
                  editor={ClassicEditor}
                  data={editorContent}
                  onChange={handleEditorChange}
                />
              </MDBox>
              <input type="hidden" name="type" value="text" />
              <input type="hidden" name="data" value={editorContent} />
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
