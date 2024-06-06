// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MDTypography from "components/MDTypography";

function CoursesCard({ image, name, price, level, ...rest }) {
  const imageTemplate = (
    <MKBox
      borderRadius="xl"
      shadow="lg"
      minHeight="10rem"
      maxHeight="10rem"
      sx={{
        overflow: "hidden",
        transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
        transformOrigin: "50% 0",
        backfaceVisibility: "hidden",
        willChange: "transform, box-shadow",
        transition: "transform 200ms ease-out",

        "&:hover": {
          transform: "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
        },
      }}
      {...rest}
    >
      <MKBox component="img" src={image} alt={name} width="100%" opacity={1} />
    </MKBox>
  );

  return (
    <MKBox position="relative">
      {imageTemplate}
      <MDTypography mt={1} variant="h6" fontWeight="medium" textTransform="capitalize" color="red">
        {name}
      </MDTypography>
      <MKBox
        mt={1}
        lineHeight={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="body2" fontWeight="regular" textTransform="capitalize" color="red">
          {level}
        </MDTypography>
        <MDTypography variant="body2" fontWeight="bold" color="red">
          {price === 0 ? "Free" : price + " DA"}
        </MDTypography>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the CoursesCard
CoursesCard.defaultProps = {
  name: "",
  price: 0,
  level: "",
};

// Typechecking props for the CoursesCard
CoursesCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  price: PropTypes.number,
  level: PropTypes.string,
};

export default CoursesCard;
