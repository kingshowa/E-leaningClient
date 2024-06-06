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
import MKProgress from "components/MKProgress";

// Presentation page components
import CourseCard from "pages/Learning/components/CompletedCourseCard";
import MKButton from "components/MKButton";

// Data
//import data from "pages/Presentation/sections/data/designBlocksData";

function Courses({ data }) {
  const renderData = data.map(({ id, name, description, courses, progress }) => (
    <Grid container spacing={3} sx={{ mb: 5 }} key={id}>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {courses.map(({ id, photo, name, description, progress, level }) => (
            <Grid item xs={12} md={4} key={id}>
              <CourseCard
                image={photo}
                title={name}
                description={description}
                progress={progress}
                level={level}
                action={{
                  route: "/course/study/" + id,
                  color: "info",
                  label: progress == 0 ? "start course" : "continue study",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} lg={3}>
        <MKBox position="sticky" top="50px" pb={{ xs: 2, lg: 6 }}>
          <MDTypography variant="h3" fontWeight="bold" mb={1} color="red">
            {name}
          </MDTypography>
          <MKProgress color="success" value={progress} label />
          <MKTypography variant="body2" component="p" color="text" my={2}>
            {description}
          </MKTypography>
          <MKButton>Download Certificate</MKButton>
        </MKBox>
      </Grid>
    </Grid>
  ));

  return (
    <MKBox component="section">
      <MKBox sx={{ mt: 6 }}>{renderData}</MKBox>
    </MKBox>
  );
}

Courses.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Courses;
