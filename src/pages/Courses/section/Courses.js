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
import CourseCard from "pages/Home/components/CourseCard";

function Courses({ data }) {
  const renderData = data.map(({ id, photo, name, price, level }) => (
    <Grid item xs={12} md={4} lg={3} sx={{ mb: 2 }} key={id}>
      <Link to={"/course/" + id}>
        <CourseCard image={photo} name={name} price={price} level={level} />
      </Link>
    </Grid>
  ));

  return (
    <MKBox component="section">
      <Container sx={{ mt: { xs: 2, lg: 4 } }}>
        <Grid container spacing={3}>
          {renderData}
        </Grid>
      </Container>
    </MKBox>
  );
}

Courses.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Courses;
