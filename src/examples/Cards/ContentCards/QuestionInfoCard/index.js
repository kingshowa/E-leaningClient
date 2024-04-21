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

function ContentInfoCard({ image, context, shadow }) {
  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <Grid container>
        <Grid item pr={4}>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={0} px={2}>
            <MDTypography variant="p">{context}</MDTypography>
          </MDBox>
          {image !== "" ? (
            <CardMedia
              component="img"
              src={image}
              sx={{
                maxWidth: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          ) : null}
        </Grid>
      </Grid>
    </Card>
  );
}

// Setting default props for the ContentInfoCard
ContentInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ContentInfoCard
ContentInfoCard.propTypes = {
  image: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

export default ContentInfoCard;
