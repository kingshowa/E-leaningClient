import { useState, useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
//import DefaultNavbar from "examples/front/Navbars/DefaultNavbar";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleToggle from "examples/front/SimpleToggle";
import Footer from "layouts/authentication/components/Footer";

// Images
import bgImage from "assets/front/images/bg-about-us.jpg";

//css
import "assets/css/style.css";
import { fetchObjects } from "api.js";
import { useAuth } from "context/authContext";

import Courses from "pages/Learning/sections/Courses";
import CompletedCourses from "pages/Learning/sections/CompletedCourses";
import Programs from "pages/Learning/sections/Programs";
import CompletedPrograms from "pages/Learning/sections/CompletedPrograms";

function AboutUs() {
  const { token } = useAuth();
  // togle tabs
  const [toggleState, setToggleState] = useState(0);

  const [userData, setUserData] = useState();
  const [courseData, setCourseData] = useState();
  const [completedCourseData, setCompletedCourseData] = useState();
  const [completedProgramData, setCompletedProgramData] = useState();
  const [programData, setProgramData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // fetch course data
  const fetchCourseData = async () => {
    try {
      const fetchedData = await fetchObjects("courses/enrolled", token);
      setCourseData(fetchedData.courses);
      setUserData(fetchedData.user);
      setCompletedCourseData(fetchedData.completed_courses);
      setIsLoading(false);
      console.log(courseData);
      console.log(completedCourseData);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
      // Set error state for displaying error message to users
    }
  };

  // fetch program data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchObjects("programs/enrolled", token);
        setProgramData(fetchedData.programs);
        setCompletedProgramData(fetchedData.completed_programs);
        fetchCourseData();
        console.log(programData);
        console.log(completedProgramData);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
        // Set error state for displaying error message to users
      }
    };
    fetchData();
  }, []);

  //console.log(token);
  return (
    <>
      <DefaultNavbar />
      <MKBox
        minHeight="55vh"
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
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="start"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "start" }}
          >
            <MKTypography
              variant="h5"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Welcome
            </MKTypography>
            <MKTypography variant="h3" color="white" opacity={0.8} mt={1} mb={3}>
              {userData && userData.name ? userData.name : " "}
              {userData && userData.surname ? " " + userData.surname : ""}
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -15,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container>
          <MKBox pt={2} display="flex" justifyContent="space-between" alignItems="center">
            <MKTypography
              variant="h3"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              My Learnings
            </MKTypography>
            <SimpleToggle setToggleState={setToggleState} />
          </MKBox>
          <MKBox mt={2} mb={2} className={toggleState == 0 ? "active-content" : "content"}>
            <MKTypography variant="body1" color="text" opacity={0.8}>
              In Progress
            </MKTypography>
            {isLoading ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : (
              <div>
                <Courses data={courseData} />
                <Programs data={programData} />
              </div>
            )}
          </MKBox>
          <MKBox mt={2} mb={2} className={toggleState == 1 ? "active-content" : "content"}>
            <MKTypography variant="body1" color="text" opacity={0.8} mt={1} mb={3}>
              Completed
            </MKTypography>
            {isLoading ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : (
              <div>
                <CompletedCourses data={completedCourseData} />
                <CompletedPrograms data={completedProgramData} />
              </div>
            )}
          </MKBox>
        </Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <Footer />
      </MKBox>
    </>
  );
}

export default AboutUs;
