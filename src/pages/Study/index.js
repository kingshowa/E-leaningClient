// @mui material components
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";
import MDSwitch from "components/MDSwitch";

import { Link, useNavigate, useParams } from "react-router-dom";

// Images
import bgImage from "assets/front/images/bg-presentation.jpg";
import { useState, useEffect } from "react";
import React, { useCallback } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { fetchObjects } from "api.js";

import { Icon } from "@mui/material";
import ModulesSideNav from "./sections/ModulesSideNav";
import MDBox from "components/MDBox";
import ContentDisplay from "./sections/ContentDisplay";
import { useAuth } from "context/authContext";
import CourseNavBar from "pages/Study/sections/CourseNavBar.js";
import Footer from "layouts/authentication/components/Footer";

function Courses() {
  const { id } = useParams("id");
  const { token } = useAuth();
  const [modulesData, setModulesData] = useState();
  const [isLoadingModules, setIsLoadingModules] = useState(true);
  const [activeModule, setActiveModule] = useState();
  const [contentsData, setContentsData] = useState();
  const [isLoadingContents, setIsLoadingContents] = useState(true);

  const [index, setIndex] = useState();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const handle = useFullScreenHandle();

  // toggle module nav
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  // Go full screen
  const goFullScreen = () => {
    if (isNavOpen) setIsNavOpen(!isNavOpen);
  };

  // fetch Modules data
  useEffect(() => {
    const fetchModulesData = async () => {
      try {
        const fetchedData = await fetchObjects("study/modules/" + id, token);
        setModulesData(fetchedData.course);
        setActiveModule(fetchedData.course.active_module);
        setIndex(fetchedData.course.index);
        setIsLoadingModules(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchModulesData();
  }, [id, token]);

  const fetchContentsData = useCallback(
    async (moduleId) => {
      try {
        setIsLoadingContents(true);
        const fetchedData = await fetchObjects("study/module/" + moduleId, token);
        setContentsData(fetchedData.module);
        setIsLoadingContents(false);
      } catch (error) {
        console.error("Failed to fetch contents:", error);
      }
    },
    [token]
  );

  useEffect(() => {
    if (activeModule) {
      fetchContentsData(activeModule);
    }
  }, [activeModule, fetchContentsData]);

  const getNextModule = () => {
    const nextIndex = index + 1;
    if (nextIndex <= modulesData.modules.length) {
      const nextModuleId = modulesData.modules[nextIndex - 1].id;
      setActiveModule(nextModuleId);
      setIndex(nextIndex);
    }
  };

  const getPrevModule = () => {
    const prevIndex = index - 1;
    if (prevIndex >= 1) {
      const prevModuleId = modulesData.modules[prevIndex - 1].id;
      setActiveModule(prevModuleId);
      setIndex(prevIndex);
    }
  };

  return (
    <>
      <CourseNavBar courseId={id} courseName={modulesData ? modulesData.name : ""} isStudy />
      <MKBox component="section" sx={{ mx: { xs: 1, md: 3 } }}>
        <Grid container spacing={isNavOpen ? 3 : 0}>
          <Grid item sm={0} md={isNavOpen ? 3 : 0} sx={{ display: { xs: "none", md: "block" } }}>
            <MKBox mt={2} mb={2} className={isNavOpen ? "active-content" : "content"}>
              {!isLoadingModules ? (
                <ModulesSideNav
                  modules={modulesData.modules}
                  setActiveModule={setActiveModule}
                  setIndex={setIndex}
                />
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
              <MDTypography
                variant="h6"
                fontWeight="medium"
                sx={{ mr: { xs: 0, md: "48%" }, mt: -1.5 }}
              >
                {contentsData ? index + ". " + contentsData.name : ""}
              </MDTypography>
              <MDTypography
                variant="button h6"
                fontWeight="bold"
                onClick={() => {
                  goFullScreen();
                  handle.enter();
                }}
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
                  left: { xs: 0, md: isNavOpen ? "25%" : 0 },
                  transform: "translateY(-50%)",
                  zIndex: 10,
                }}
              >
                <MDTypography variant="button h2" fontWeight="bold" onClick={() => getPrevModule()}>
                  <Icon fontSize="large">arrow_back_ios</Icon>
                </MDTypography>
              </MDBox>
              <MDBox
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  zIndex: 10,
                }}
              >
                <MDTypography variant="button h1" fontWeight="bold" onClick={() => getNextModule()}>
                  <Icon fontSize="large">arrow_forward_ios</Icon>
                </MDTypography>
              </MDBox>
              {!isLoadingContents ? (
                <ContentDisplay contents={contentsData.contents} p_index={index} courseId={id} />
              ) : null}
            </FullScreen>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox px={1} mt={3}>
        <Footer />
      </MKBox>
    </>
  );
}

export default Courses;
