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
import MDTextarea from "components/MDTextarea";
import MDTypography from "components/MDTypography";
import SearchableSelect from "components/MDSelect/SearchableSelect";
import Pagination from "components/MDPagination/Pagination";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ModuleInfoCard from "examples/Cards/InfoCards/ModuleInfoCard";
import DataTable from "examples/Tables/DataTable";

// react-router-dom components
import { Link } from "react-router-dom";
// Overview page components
import Header from "layouts/programs/components/Header/Header1";
//css
import "assets/css/style.css";

// Data
import { getColumns, getRows } from "layouts/contents/data";

import contents from "assets/json/contents.json";
import modules from "assets/json/modules.json";
//import courses from "assets/json/courses.json";

import { fetchObjects, deleteObject } from "api.js";

function ViewModule() {
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
        const data1 = await fetchObjects("module/contents/" + id);
        setData(data1.module);
        setCourses(data1.courses);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, [id]);

  // Courses table
  const columns = getColumns();
  const rows = data ? getRows({ items: data.contents, setData, parent_id: id }) : []; //  courses is an array not object

  // selected value from Searchable selection
  const [selectedValue, setSelectedValue] = useState(0);
  const [courses, setCourses] = useState();
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
    data.course_id = selectedValue;
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
          <ModuleInfoCard
            title={data.name}
            description={data.description}
            info={{
              creator: "Alec M. Thompson",
              duration: "2 hrs",
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
                    name="name"
                    label="Name"
                    fullWidth
                    value={data.name}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="text"
                    name="code"
                    label="Code"
                    fullWidth
                    value={data.code}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDInput
                    type="number"
                    name="duration"
                    label="Duration in hours"
                    fullWidth
                    value={data.duration}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <SearchableSelect
                    options={courses}
                    name="course_id"
                    val={data.course_id}
                    title="Select course"
                    setValue={setSelectedValue}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDTextarea
                    name="description"
                    label="Description"
                    value={data.description}
                    onChange={handleInputChange}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}>
                <MDBox my={1}>
                  <MDButton variant="gradient" color="dark" type="submit">
                    update course
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
                px={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" fontWeight="medium">
                  Module Contents
                </MDTypography>
                <MDButton variant="gradient" color="dark" component={Link} to="/create-content">
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new content
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
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

export default ViewModule;
