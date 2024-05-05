// @mui material components
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MDTypography from "components/MDTypography";
import MKButton from "components/MKButton";
import MDSwitch from "components/MDSwitch";

import { Link, useNavigate, useParams } from "react-router-dom";

import "assets/css/style.css";

// Images
import bgImage from "assets/front/images/bg-presentation.jpg";
import { useState, useEffect } from "react";
import React, { useCallback } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { fetchObjects } from "api.js";

import ListCourses from "pages/Courses/section/Courses";
import { Icon } from "@mui/material";
import ModulesSideNav from "./sections/ModulesSideNav";
import { position } from "stylis";
import MDBox from "components/MDBox";
import zIndex from "@mui/material/styles/zIndex";
import ContentDisplay from "./sections/ContentDisplay";
import { useAuth } from "context/authContext";

function Courses() {
  const { id } = useParams("id");
  const { token } = useAuth();
  const [modulesData, setModulesData] = useState();
  const [isLoadingModules, setIsLoadingModules] = useState(true);
  const [activeModule, setActiveModule] = useState();
  const [contentsData, setContentsData] = useState();
  const [isLoadingContents, setIsLoadingContents] = useState(true);

  // fetch Modules data
  useEffect(() => {
    const fetchModulesData = async () => {
      try {
        const fetchedData = await fetchObjects("study/modules/" + id, token);
        setModulesData(fetchedData.course);
        setActiveModule(fetchedData.course.active_module);
        setIsLoadingModules(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
        // Set error state for displaying error message to users
      }
    };
    fetchModulesData();
  }, []);

  useEffect(() => {
    const fetchContentsData = async () => {
      if (activeModule)
        try {
          const fetchedData = await fetchObjects("study/module/" + activeModule, token);
          setContentsData(fetchedData.module);
          setIsLoadingContents(false);
        } catch (error) {
          console.error("Failed to fetch objects:", error);
          // Set error state for displaying error message to users
        }
    };
    fetchContentsData();
  }, [activeModule]);
  console.log(contentsData);
  //console.log(activeModule);

  const [isNavOpen, setIsNavOpen] = useState(true);
  const handle = useFullScreenHandle();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  // Go full screen
  const goFullScreen = () => {
    if (isNavOpen) setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <MKBox
        minHeight="50px"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
        }}
      >
        <MKBox px={3} display="flex" justifyContent="space-between" alignItems="center">
          <MKBox>
            <MDTypography variant="button h2" fontWeight="bold" color="white">
              MAJID
            </MDTypography>
            <MDTypography variant="button h2" fontWeight="light" color="white">
              Learn
            </MDTypography>
          </MKBox>
          <MDTypography
            color="white"
            variant="h6"
            fontWeight="medium"
            sx={{ display: { xs: "none", md: "block" }, mr: "20%" }}
          >
            {modulesData ? modulesData.name : ""}
          </MDTypography>
          <MKBox display="flex" justifyContent="space-between" alignItems="center">
            <MDSwitch />
            <MDTypography
              variant="h2 button"
              fontWeight="bold"
              mt={1}
              component={Link}
              to="/learning"
              color="white"
            >
              <Icon sx={{ ml: 2 }} fontSize="xl3">
                close
              </Icon>
            </MDTypography>
          </MKBox>
        </MKBox>
      </MKBox>
      <MKBox component="section" mx={3}>
        <Grid container spacing={isNavOpen ? 3 : 0}>
          <Grid item sm={0} md={isNavOpen ? 3 : 0} sx={{ display: { xs: "none", md: "block" } }}>
            <MKBox mt={2} mb={2} className={isNavOpen ? "active-content" : "content"}>
              {modulesData ? (
                <ModulesSideNav modules={modulesData.modules} setActiveModule={setActiveModule} />
              ) : null}
            </MKBox>
          </Grid>
          <Grid item xs={12} md={isNavOpen ? 9 : 12} sx={{ mb: { xs: 3, lg: 0 } }}>
            <MKBox display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <MDTypography
                variant="button h2"
                fontWeight="bold"
                onClick={() => toggleNav()}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Icon fontSize="medium">{isNavOpen ? "menu_open" : "menu"}</Icon>
              </MDTypography>
              <MDTypography variant="h6" fontWeight="medium" sx={{ mr: "48%", mt: -1.5 }}>
                Module Name
              </MDTypography>
              <MDTypography
                variant="button h2"
                fontWeight="bold"
                onClick={() => {
                  goFullScreen();
                  handle.enter();
                }}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Icon sx={{ mt: 0 }} fontSize="medium">
                  fullscreen
                </Icon>
              </MDTypography>
            </MKBox>
            <Divider sx={{ mt: -0 }} />
            <FullScreen handle={handle}>
              <MDBox
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: isNavOpen ? "25%" : 5,
                  transform: "translateY(-50%)",
                  zIndex: 10,
                }}
              >
                <MDTypography variant="button h2" fontWeight="bold" onClick={() => toggleNav()}>
                  <Icon fontSize="large">arrow_back_ios</Icon>
                </MDTypography>
              </MDBox>
              <MDBox
                sx={{ position: "absolute", top: "50%", right: 5, transform: "translateY(-50%)" }}
              >
                <MDTypography variant="button h1" fontWeight="bold" onClick={() => toggleNav()}>
                  <Icon fontSize="large">arrow_forward_ios</Icon>
                </MDTypography>
              </MDBox>
              <ContentDisplay />
            </FullScreen>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default Courses;
