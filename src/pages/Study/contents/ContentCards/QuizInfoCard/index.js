// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function QuizInfoCard({ title, instruction, info, shadow }) {
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
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" px={2}>
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              {title}
            </MDTypography>
          </MDBox>
          <MDBox p={2}>
            <MDBox lineHeight={1}>
              <MDTypography variant="button" color="text" fontWeight="light">
                {instruction}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <MDBox pl={2}>
            <MDBox>{renderItems}</MDBox>
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
  title: PropTypes.string.isRequired,
  instruction: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  shadow: PropTypes.bool,
};

export default QuizInfoCard;
