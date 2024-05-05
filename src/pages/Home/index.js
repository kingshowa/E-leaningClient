// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import Footer from "layouts/authentication/components/Footer";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Courses from "pages/Home/sections/Courses";
import Programs from "pages/Home/sections/Programs";
import Testimonials from "pages/Presentation/sections/Testimonials";

// Images
import bgImage from "assets/front/images/home-bg.jpg";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { fetchObjects } from "api.js";

function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchObjects("programs/courses", "");
        setData(fetchedData.programs);
        setIsLoading(false);
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
        minHeight="100vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={6} px={{ xs: 0, lg: 1 }} justifyContent="">
            <MKTypography variant="h1" color="white" mt={4} mb={1} pl={0}>
              Unlock Your Future With MajidLearn.
            </MKTypography>
            <MKTypography variant="body1" color="white" mt={1}>
              MajidLearn is a gateway to endless knowledge and growth. Empowering learning, anytime,
              anywhere. Join thousands of learners excelling with us and embark on your journey
              towards success!
            </MKTypography>
            <MKTypography
              mt={3}
              component={Link}
              to="#courses"
              variant="body1"
              color="white"
              fontWeight="regular"
              sx={{
                display: "flex",
                alignItems: "center",

                "& .material-icons-round": {
                  fontSize: "1.125rem",
                  transform: `translateX(3px)`,
                  transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                },

                "&:hover .material-icons-round, &:focus .material-icons-round": {
                  transform: `translateX(6px)`,
                },
              }}
            >
              Explore learnings <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: 4,
          mb: 4,
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Counters />
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <Courses data={data} />
            <Programs data={data} />
          </div>
        )}
        <Testimonials />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <Footer />
      </MKBox>
    </>
  );
}

export default Home;
