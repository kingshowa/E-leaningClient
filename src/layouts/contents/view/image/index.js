import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ImageContentCard from "examples/Cards/ContentCards/ImageContentCard";

// Overview page components
import Header from "layouts/programs/components/Header/Header1";
//css
import "assets/css/style.css";

// Data
import { postData, fetchObjects } from "api.js";
import { useAuth } from "context/authContext";

function ViewContent() {
  const { token } = useAuth();

  // Get params from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const state = Number(searchParams.get("state"));

  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // fetch data
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data1 = await fetchObjects("content/image/" + id, token);
      setData(data1.image);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  };

  // togle tabs
  const [toggleState, setToggleState] = useState(state);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setIsSaved(false);
    console.log(data);
  };

  // Upload file type
  const handleFileUpload = (event) => {
    data.image = event.target.files[0];
    setIsSaved(false);
    console.log(data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    if (data != null) {
      const url = "content/image/edit/" + id;
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
    // perfom save operations
  };

  useEffect(() => {
    if (isSaved) {
      setToggleState(0);
      fetchData();
    }
  }, [isSaved]);

  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header state={toggleState} setToggleState={setToggleState}>
        {/* View content */}
        <MDBox mt={5} mb={2} className={toggleState == 0 ? "active-content" : "content"}>
          <ImageContentCard
            title={data.title}
            image={data.link}
            caption={data.caption}
            shadow={false}
          />
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
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="file"
                    name="link"
                    label="Image file"
                    fullWidth
                    onChange={handleFileUpload}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="text"
                    name="caption"
                    label="Caption"
                    fullWidth
                    value={data.caption}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
              <input type="hidden" name="type" value="image" />
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
