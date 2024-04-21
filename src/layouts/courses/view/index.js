import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTextarea from "components/MDTextarea";
import MDTypography from "components/MDTypography";
import MDSelect from "components/MDSelect";
import SearchableSelect from "components/MDSelect/SearchableSelect";
import Pagination from "components/MDPagination/Pagination";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProgramInfoCard from "examples/Cards/InfoCards/ProgramInfoCard";
import DataTable from "examples/Tables/DataTable";

// react-router-dom components
import { Link } from "react-router-dom";
// Overview page components
import Header from "layouts/programs/components/Header";
//css
import "assets/css/style.css";

// Data
import { getColumns, getRows } from "layouts/modules/data";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";

import { fetchObjects, postData, editData } from "api.js";

function ViewCourse() {
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
    const fetchData = async () => {
      try {
        const data1 = await fetchObjects("course/modules/" + id);
        setData(data1.course);
        setTeachers(data1.teachers);
        setFormData(data1.course);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, [id]);

  // Courses table
  const columns = getColumns();
  const rows = data ? getRows({ items: data.modules, setData, parent_id: id }) : []; //  courses is an array not object

  // selected value from Searchable selection
  const [selectedValue, setSelectedValue] = useState(0);
  const [teachers, setTeachers] = useState();

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
    setFormData({ ...formData, [name]: checked });
    console.log(formData.enabled ? "Disabled" : "Enabled");
    const url = "course/enable/" + id;
    const saveData = async () => {
      try {
        const d = { enabled: checked };
        const responseData = await editData(d, url);
        console.log("Data saved successfully:", responseData);
        // Navigate to another page after successful data saving
        //setIsSaved(true);
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };
    saveData();
  };
  // Handle switch toggle
  const handleSwitchChange2 = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    console.log(formData.completed ? "Not Complete" : "Completed");
    const url = "course/completed/" + id;
    const saveData = async () => {
      try {
        const d = { completed: checked };
        const responseData = await editData(d, url);
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
    formData.assigned_to = selectedValue;
    if (formData != null) {
      const url = "course/edit/" + id;
      const saveData = async () => {
        try {
          const responseData = await postData(formData, url);
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

  // Upload file type
  const handleFileUpload = (event) => {
    // get the selected file from the input
    formData.photo = event.target.files[0];
  };

  useEffect(() => {
    if (isSaved) {
      // Perform navigation after state change
      window.location.href = "/courses/course?id=" + id; // Navigate to another page
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
            image={homeDecor1}
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
                      type="text"
                      name="code"
                      label="Code"
                      fullWidth
                      value={formData.code}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <MDSelect
                      defaultValue=" "
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                    >
                      <MenuItem value=" ">Select Level</MenuItem>
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advanced">Advanced</MenuItem>
                    </MDSelect>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox my={1}>
                    <SearchableSelect
                      options={teachers}
                      name="assigned_to"
                      val={formData.assigned_to}
                      title="Select responsible teacher"
                      setValue={setSelectedValue}
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
                  <MDBox my={2}>
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
                      update course
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
        {/* Edit content */}
        {formData ? (
          <MDBox mt={5} mb={2} className={toggleState == 2 ? "active-content" : "content"}>
            <MDBox component="form" role="form" onSubmit={handleSubmit} p={3} pt={2}>
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
                      &nbsp;&nbsp;Enable Course
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox>
                    <Switch
                      name="completed"
                      checked={formData.completed}
                      onChange={handleSwitchChange2}
                    />
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Course completed
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
                  Course Modules
                </MDTypography>
                <MDButton variant="gradient" color="dark" component={Link} to="/modules/create">
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new module
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

export default ViewCourse;
