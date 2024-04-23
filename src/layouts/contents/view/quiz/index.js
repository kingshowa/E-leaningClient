import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Pagination from "components/MDPagination/Pagination";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import QuizInfoCard from "examples/Cards/ContentCards/QuizInfoCard";

// react-router-dom components
import { Link } from "react-router-dom";
// Overview page components
import Header from "layouts/programs/components/Header/Header1";
//css
import "assets/css/style.css";

// Data
import { getColumns, getRows } from "layouts/contents/data/questions";

import quiz from "assets/json/quiz.json";
import { fetchObjects, editData } from "api.js";

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
        const data1 = await fetchObjects("quize/questions/" + id);
        setData(data1.quize);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, [id]);

  // Courses table
  const columns = getColumns();
  const rows = data ? getRows({ items: data.questions, setData, parent_id: id }) : []; //  courses is an array not object

  // Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page
  const totalPages = () => {
    return Math.ceil(rows.length / rowsPerPage); // Use Math.ceil to round up to the nearest whole number
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = rows.slice(startIndex, startIndex + rowsPerPage);

  // togle tabs
  const [toggleState, setToggleState] = useState(state);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    if (data != null) {
      const url = "content/quize/edit/" + id;
      const saveData = async () => {
        try {
          const responseData = await editData(data, url);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          setToggleState(0);
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
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
          <QuizInfoCard
            title={data.content.title}
            instruction={data.instruction}
            info={{
              questions: data.questions.length,
              duration: data.content.duration + " Minutes",
              pass_mark: data.pass_percentage + " %",
            }}
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
                    type="text"
                    name="instruction"
                    label="Instruction"
                    fullWidth
                    value={data.instruction}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="text"
                    name="pass_percentage"
                    label="Passing mark (%)"
                    fullWidth
                    value={data.pass_percentage}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
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
      <MDBox pt={2} pb={3}>
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
                  Questions
                </MDTypography>
                <MDButton
                  variant="gradient"
                  color="dark"
                  component={Link}
                  to={"/create-question?id=" + id}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add question
                </MDButton>
              </MDBox>
              <MDBox pt={3} px={3}>
                <DataTable
                  table={{ columns, rows: visibleRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              <MDBox p={2} alignItems="center" display="flex" justifyContent="space-around">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
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
