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
  const renderData = data.map(({ id, photo, name, price, description }) => (
    <Grid item xs={12} md={6} xl={4} sx={{ mb: { xs: 3, lg: 0 } }} key={id}>
      <Link to={"/program/" + id}>
        <ProgramCard
          image={photo}
          name={name}
          price={price}
          description={description}
          display="grid"
          minHeight="auto"
        />
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

Programs.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Programs;
