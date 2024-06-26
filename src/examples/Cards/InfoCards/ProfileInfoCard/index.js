// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import burceMars from "assets/images/bruce-mars.jpg";

function ProfileInfoCard({ title, photo, info, name, role, action, shadow }) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

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
        <Grid item xs={12} md={4}>
          <MDBox display="flex" justifyContent="space-around" alignItems="center" pt={2} px={2}>
            <MDAvatar bgColor="dark" src={photo} alt="profile-image" size="xxl" shadow="sm" />
          </MDBox>
          <MDBox display="flex" justifyContent="space-around" alignItems="center" pt={2} px={2}>
            <MDTypography variant="h5" fontWeight="medium">
              {name}
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="space-around" alignItems="center" px={2}>
            <MDTypography
              variant="button"
              color="text"
              fontWeight="regular"
              textTransform="capitalize"
            >
              {role === "admin" ? "Administrator" : role}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={8}>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              {title}
            </MDTypography>
          </MDBox>
          <MDBox p={2}>
            <MDBox>{renderItems}</MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
