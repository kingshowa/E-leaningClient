// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function QuizInfoCard({ id, title, instruction, info, shadow, courseId, mark }) {
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none", marginBottom: 4 }}>
      <MDBox px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox lineHeight={1} p={2}>
        <MDTypography variant="button" color="text" fontWeight="light">
          {instruction}
        </MDTypography>
      </MDBox>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <MDBox pl={2}>
            <MDBox>{renderItems}</MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6}>
          {mark && (
            <MDTypography variant="button" color="text" p={2} fontWeight="light">
              Previous Mark: {mark} %
            </MDTypography>
          )}
          <MDBox p={2}>
            {mark ? (
              <MDButton color="red" component={Link} to={"/excercise/" + id + "/" + courseId}>
                Retake Excercise
              </MDButton>
            ) : (
              <MDButton color="red" component={Link} to={"/excercise/" + id + "/" + courseId}>
                Start Excercise
              </MDButton>
            )}
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Setting default props for the QuizInfoCard
QuizInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the QuizInfoCard
QuizInfoCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  instruction: PropTypes.string,
  info: PropTypes.objectOf(PropTypes.string),
  shadow: PropTypes.bool,
  courseId: PropTypes.number,
  mark: PropTypes.number,
};

export default QuizInfoCard;
