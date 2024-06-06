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
import ProgramCard from "pages/Home/components/ProgramCard";

function Programs({ data }) {
  const renderData = data.map(({ id, photo, name, price }) => (
    <Grid item xs={12} md={6} sx={{ mb: { xs: 3, lg: 0 } }} key={id}>
      {id === 0 ? null : (
        <Link to={"/program/" + id}>
          <ProgramCard image={photo} name={name} price={price} display="grid" minHeight="auto" />
        </Link>
      )}
    </Grid>
  ));

  return (
    <MKBox component="section" mt={-5}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={8}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", mx: "auto", px: 0.75 }}
        >
          <MKTypography variant="h2" fontWeight="bold" color="red">
            Browse Our Popular Programs
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: { xs: 2, lg: 6 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={9} sx={{ mt: 1, px: { xs: 0, lg: 8 } }}>
            <Grid container spacing={3}>
              {renderData}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={3}>
            <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
              <MKTypography variant="h3" fontWeight="bold" mb={1} color="red">
                Enroll in one of our Specialised programs
              </MKTypography>
              <MKTypography variant="body2" fontWeight="regular" color="text" mb={1} pr={2}>
                Delve into the realm of possibilities with our array of comprehensive programs
                designed to nurture your skills and expertise. Whether you&apos;re aiming for
                personal growth or professional advancement, our programs counter showcases the
                breadth of opportunities awaiting you. Join our thriving community and embark on a
                journey of continuous learning and development!
              </MKTypography>
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

Programs.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Programs;
