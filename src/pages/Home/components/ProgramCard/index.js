// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MDTypography from "components/MDTypography";

function ExampleCard({ image, name, price, description, ...rest }) {
  const imageTemplate = (
    <MKBox
      borderRadius="xl"
      shadow="lg"
      minHeight="10rem"
      maxHeight="20rem"
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

      <MKBox
        mt={1}
        lineHeight={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography mt={1} variant="h6" fontWeight="medium" textTransform="capitalize">
          {name}
        </MDTypography>
        <MKTypography variant="body2" fontWeight="regular" color="secondary">
          {price === 0 ? "Free" : price + " DA"}
        </MKTypography>
      </MKBox>
      {description && (
        <MKTypography variant="body2" fontWeight="regular" color="secondary">
          {description}
        </MKTypography>
      )}
    </MKBox>
  );
}

// Setting default props for the ExampleCard
ExampleCard.defaultProps = {
  name: "",
  price: 0,
};

// Typechecking props for the ExampleCard
ExampleCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

export default ExampleCard;
