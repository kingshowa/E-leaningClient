import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTextarea from "components/MDTextarea";
import EditImageOption from "layouts/contents/edit/question/EditImageOption";
import EditTextOption from "layouts/contents/edit/question/EditTextOption";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import QuestionInfoCard from "examples/Cards/ContentCards/QuestionInfoCard";
import DataTable from "examples/Tables/DataTable";

// Overview page components
import Header from "layouts/programs/components/Header/Header1";
//css
import "assets/css/style.css";

// Data
import { getColumns, getRows } from "layouts/contents/data/options";

import quiz from "assets/json/quiz.json";
import { fetchObjects, deleteObject } from "api.js";

function ViewContent() {
  // Get params from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = Number(searchParams.get("id"));
  const state = Number(searchParams.get("state"));

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchObjects("question/" + id);
        setData(data1.question);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, [id]);

  // Courses table
  const columns = data ? getColumns() : [];
  const rows = data ? getRows({ items: data.options, setData, parent_id: id }) : [];

  // togle tabs
  const [toggleState, setToggleState] = useState(state);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const renderContent = () => {
    switch (data.options[0].type) {
      case "image":
        return (
          <>
            {Array.from({ length: data.options.length }, (_, index) => (
              <EditImageOption
                key={index + 1}
                index={index + 1}
                disabled={false}
                optionData={data.options[index]}
              />
            ))}
          </>
        );
      case "text":
        return (
          <>
            {Array.from({ length: data.options.length }, (_, index) => (
              <EditTextOption
                key={index + 1}
                index={index + 1}
                disabled={false}
                optionData={data.options[index]}
              />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  const handleFileUpload = (event) => {
    // get the selected file from the input
    data.imageUrl = event.target.files[0];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    // perfom save operations
  };

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
          <QuestionInfoCard image={""} context={data.context} shadow={false} />
        </MDBox>
        {/* Edit content */}
        <MDBox mt={3} mb={2} className={toggleState == 1 ? "active-content" : "content"}>
          <MDBox component="form" role="form" onSubmit={handleSubmit} p={3} pt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDBox my={1}>
                  <MDTextarea
                    name="context"
                    label="Question"
                    value={data.context}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="file"
                    name="imageUrl"
                    label="Image"
                    fullWidth
                    onChange={handleFileUpload}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={2}></Grid>
              <Grid item xs={12} md={3} ml={5}>
                <MDBox my={1}>
                  <MDButton variant="gradient" color="dark" type="submit">
                    save question
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Header>
      <MDBox mt={3} mb={2} className={toggleState == 1 ? "active-content" : "content"}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card id="delete-account">
              <MDBox px={5} pt={2}>
                <MDTypography variant="h6" fontWeight="medium">
                  Edit Options
                </MDTypography>
              </MDBox>
              <MDBox px={5} mb={3}>
                {renderContent()}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} pb={3} className={toggleState == 0 ? "active-content" : "content"}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                pt={2}
                px={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" fontWeight="medium">
                  Options
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewContent;
