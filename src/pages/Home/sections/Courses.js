// react-router-dom components
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MDTypography from "components/MDTypography";

// Presentation page components
import CourseCard from "pages/Home/components/CourseCard";

// Data
//import data from "pages/Presentation/sections/data/designBlocksData";

function Courses({ data }) {
  const renderData = data.map(({ id, name, description, courses }) => (
    <Grid container spacing={3} sx={{ mb: 10 }} key={id}>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
          <MKTypography variant="h3" fontWeight="bold" mb={1} color="red">
            {name} Courses
          </MKTypography>
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {courses.map(({ id, photo, name, price, level }) => (
            <Grid item xs={12} md={4} sx={{ mb: 2 }} key={id}>
              <Link to={"/course/" + id}>
                <CourseCard image={photo} name={name} price={price} level={level} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <MKBox component="section" py={6} id="courses" mt={-5}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={8}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 3, mx: "auto", px: 0.75 }}
        >
          <MKTypography variant="h2" fontWeight="bold" color="red">
            Browse Popular Courses Collection
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>{renderData}</Container>
    </MKBox>
  );
}

Courses.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Courses;
