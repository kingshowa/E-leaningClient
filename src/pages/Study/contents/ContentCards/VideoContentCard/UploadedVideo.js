// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function VideoContentCard({ video, title, caption, shadow }) {
  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <Grid container spacing={6}>
        <Grid item>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              {title}
            </MDTypography>
          </MDBox>
          <MDBox position="relative" width="100%" shadow="sm" mx={2}>
            <CardMedia
              component="video"
              controls
              autoPlay
              loop
              muted
              src={video}
              title={title}
              sx={{
                maxWidth: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </MDBox>
          <MDBox p={2}>
            <MDBox lineHeight={1}>
              <MDTypography variant="button" color="text" fontWeight="light">
                {caption}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Setting default props for the VideoContentCard
VideoContentCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the VideoContentCard
VideoContentCard.propTypes = {
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

export default VideoContentCard;
