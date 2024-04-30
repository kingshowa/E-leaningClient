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
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Data
import { getColumns, getRows } from "layouts/courses/data";

// Overview page components
import Header from "layouts/users/components/Header";

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

  // fetch data
  useEffect(() => {
    fetchData();
    if (data) setIsLoading(false);
    else setIsLoading(true);
  }, [data]);

  const fetchData = async () => {
    try {
      const data1 = await fetchObjects("user/courses/" + id, token);
      setData(data1.user);
      setFormData(data1.user);
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
        const data1 = await fetchObjects("user/select/courses/" + id, token);
        setCourses(data1.courses);
        //setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, []);

  // users table
  const columns = getColumns();
  const rows = data ? getRows({ items: data.courses, setData, parent_id: id, user: true }) : []; //  users is an array not object

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page
  const totalPages = () => {
    return Math.ceil(rows.length / rowsPerPage); // Use Math.ceil to round up to the nearest whole number
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = rows.slice(startIndex, startIndex + rowsPerPage);

  // togle tabs
  const [toggleState, setToggleState] = useState(state);

  // Handle switch toggle
  const handleSwitchChange1 = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
    console.log(formData.enabled ? "Disabled" : "Enabled");
    const url = "user/enable/" + id;
    const saveData = async () => {
      try {
        const d = { enabled: checked };
        const responseData = await editData(d, url, token);
        console.log("Data saved successfully:", responseData);
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };
    saveData();
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    if (selectedValue != 0) {
      const courseData = {
        courseId: selectedValue,
        userId: id,
      };
      const url = "user/add/course";
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
          <ProfileInfoCard
            photo={data.photo}
            name={data.name + " " + data.surname}
            role={data.role}
            title="profile information"
            info={{
              firstName: data.name,
              lastName: data.surname,
              email: data.email,
              Role: data.role,
              Status: data.enabled ? "Enabled" : "Disabled",
            }}
            shadow={false}
          />
        </MDBox>
        <MDBox mt={5} mb={2} className={toggleState == 1 ? "active-content" : "content"}>
          <MDBox p={3} pt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MDBox>
                  <Switch name="enabled" checked={data.enabled} onChange={handleSwitchChange1} />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Enable User
                  </MDTypography>
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
                  User Courses
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
