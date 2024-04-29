import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDTextarea from "components/MDTextarea";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Pagination from "components/MDPagination/Pagination";
import SearchableSelect from "components/MDSelect/SearchableSelect";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ProgramInfoCard from "examples/Cards/InfoCards/ProgramInfoCard";

// react-router-dom components
import { Link } from "react-router-dom";

// Data
import { getColumns, getRows } from "layouts/courses/data";

// Overview page components
import Header from "layouts/programs/components/Header";

//css
import "assets/css/style.css";

import { fetchObjects, postData, editData } from "api.js";
import { useAuth } from "context/authContext";

function ViewProgram() {
  const { token } = useAuth();

  // Get params from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = Number(searchParams.get("id"));
  const state = Number(searchParams.get("state"));

  const [data, setData] = useState();
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  // fetch data
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data1 = await fetchObjects("program/courses/" + id, token);
      setData(data1.program);
      setFormData(data1.program);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  };

  // selected value from Searchable selection
  const [selectedValue, setSelectedValue] = useState(0);
  const [courses, setCourses] = useState();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchObjects("courses/manage/" + id, token);
        setCourses(data1.courses);
        //setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, []);

  // Courses table
  const columns = getColumns();
  const rows = data ? getRows({ items: data.courses, setData, parent_id: id }) : []; //  courses is an array not object

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
    setFormData({ ...formData, [name]: value });
  };
  // Handle switch toggle
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
  };
  // Handle switch toggle
  const handleSwitchChange1 = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
    console.log(formData.enabled ? "Disabled" : "Enabled");
    const url = "program/enable/" + id;
    const saveData = async () => {
      try {
        const d = { enabled: checked };
        const responseData = await editData(d, url, token);
        console.log("Data saved successfully:", responseData);
        // Navigate to another page after successful data saving
        //setIsSaved(true);
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };
    saveData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData != null) {
      const url = "program/edit/" + id;
      const saveData = async () => {
        try {
          const responseData = await postData(formData, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          setIsSaved(true);
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
    console.log(formData);
    // perfom save operations
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    if (selectedValue != 0) {
      const courseData = {
        courseId: selectedValue,
        programId: id,
      };
      const url = "program/add/course";
      const saveData = async () => {
        try {
          const responseData = await postData(courseData, url, token);
          console.log("Data saved successfully:", responseData);
          setSelectedValue(0);
          fetchData();
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
  };

  // Upload file type
  const handleFileUpload = (event) => {
    formData.photo = event.target.files[0];
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
          <ProgramInfoCard
            image={data.photo}
            title={data.name}
            price={data.price}
            description={data.description}
            info={{
              creator: "Alec M. Thompson",
              mobile: "(44) 123 1234 123",
              email: "alecthompson@mail.com",
              location: "USA",
            }}
            shadow={false}
          />
        </MDBox>
        {/* Edit content */}
        {formData ? (
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
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <MDInput
                      type="number"
                      name="price"
                      label="Price"
                      fullWidth
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <MDTextarea
                      name="description"
                      label="Bescription"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <MDInput
                      type="file"
                      name="photo"
                      label="Photo"
                      fullWidth
                      p={2}
                      onChange={handleFileUpload}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}>
                  <MDBox>
                    <Switch
                      name="enabled"
                      checked={formData.enabled}
                      onChange={handleSwitchChange}
                    />
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Enable
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <MDButton variant="gradient" color="dark" type="submit">
                      update program
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {formData ? (
          <MDBox mt={5} mb={2} className={toggleState == 2 ? "active-content" : "content"}>
            <MDBox p={3} pt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <MDBox>
                    <Switch
                      name="enabled"
                      checked={formData.enabled}
                      onChange={handleSwitchChange1}
                    />
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Enable Program
                    </MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
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
                  Program Courses
                </MDTypography>
                {courses != null ? (
                  <MDBox
                    component="form"
                    role="form"
                    onSubmit={handleSubmit1}
                    display="flex"
                    alignItems="center"
                  >
                    <SearchableSelect
                      options={courses}
                      name="course"
                      val={0}
                      title="Select course"
                      setValue={setSelectedValue}
                    />
                    <MDButton variant="gradient" color="dark" type="submit">
                      <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                      &nbsp;add
                    </MDButton>
                  </MDBox>
                ) : (
                  <div />
                )}
                <MDButton
                  variant="gradient"
                  color="dark"
                  component={Link}
                  to={"/courses/create?id=" + id}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;create new course
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

export default ViewProgram;
