// react-router-dom components
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Presentation page components
import CourseCard from "pages/Learning/components/CompletedCourseCard";

function Courses({ data }) {
  const renderData = data.map(({ id, photo, name, description, progress, level }) => (
    <Grid item xs={12} md={3} key={id}>
      <CourseCard
        id={id}
        image={photo}
        title={name}
        description={description}
        progress={progress}
        level={level}
        action={{
          route: "/course/study/" + id,
          color: "info",
          label: "revisit course",
        }}
      />
    </Grid>
  ));

  return (
    <MKBox component="section" mt={2}>
      <Grid container spacing={3}>
        {renderData}
      </Grid>
    </MKBox>
  );
}

Courses.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Courses;
