// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Footer from "layouts/authentication/components/Footer";

// About Us page sections
import Information from "pages/LandingPages/AboutUs/sections/Information";
import Team from "pages/LandingPages/AboutUs/sections/Team";
import Featuring from "pages/LandingPages/AboutUs/sections/Featuring";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";

// Images
import bgImage from "assets/front/images/bg-about-us.jpg";
import { useState, useEffect } from "react";
import { fetchObjects } from "api.js";

import ListCourses from "pages/Courses/section/Courses";

function Courses() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchObjects("courses", "");
        setData(fetchedData.courses);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
        // Set error state for displaying error message to users
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <DefaultNavbar />
      <MKBox
        minHeight="45vh"
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
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Courses
            </MKTypography>
            {/* <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Explore our diverse catalog of courses covering a myriad of subjects and interests.
              From programming to poetry, our course counter proudly displays our ever-expanding
              collection, ensuring there&apos;s always something new to discover and learn.
            </MKTypography> */}
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -10,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <ListCourses data={data} />
        )}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <Footer />
      </MKBox>
    </>
  );
}

export default Courses;
