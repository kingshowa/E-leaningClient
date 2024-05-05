// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKProgress from "components/MKProgress";
import MKBadge from "components/MKBadge";
import MKButton from "components/MKButton";

function CourseCard({ image, title, description, progress, level, action }) {
  const cardActionStyles = {
    display: "flex",
    alignItems: "center",
    width: "max-content",

    "& .material-icons, .material-icons-round,": {
      transform: `translateX(2px)`,
      transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
    },
  };

  const imageTemplate = (
    <MKBox position="relative" borderRadius="md">
      <MKBox
        component="img"
        src={image}
        alt={title}
        borderRadius="md"
        width="100%"
        height="150px"
        position="relative"
        zIndex={1}
      />
      <MKBox borderRadius="md" width="100%" height="100%" position="absolute" left={0} top={0} />
    </MKBox>
  );

  return (
    <Card
      sx={{
        background: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <Link to={action.route}>{imageTemplate}</Link>
      <MKBox mt={-5} mb={1}>
        <MKBadge badgeContent={level} color="secondary" container />
      </MKBox>
      <MKProgress color="success" value={progress} label />
      <MKBox pt={2} pb={3}>
        <Link to={action.route} sx={cardActionStyles}>
          <MKTypography variant="h5" gutterBottom>
            {title}
          </MKTypography>
        </Link>
        <MKTypography variant="body2" component="p" color="text" mb={3}>
          {description}
        </MKTypography>
        <MKTypography
          component={Link}
          to={action.route}
          variant="body2"
          fontWeight="regular"
          color={action.color}
          textTransform="capitalize"
          sx={cardActionStyles}
          mb={2}
        >
          {action.label}
          <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
        </MKTypography>
        <MKButton>Download Certificate</MKButton>
      </MKBox>
    </Card>
  );
}

// Typechecking props for the CourseCard
CourseCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "inherit",
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "text",
    ]).isRequired,
  }).isRequired,
};

export default CourseCard;
