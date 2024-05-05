import React from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ViewContent({ data, index }) {
  return (
    <MDBox mt={2} mb={1}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={0} px={2}>
        <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize">
          {index + " " + data.title}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" mt={3} px={2}>
        <MDTypography dangerouslySetInnerHTML={{ __html: data.data }} />
      </MDBox>
    </MDBox>
  );
}

ViewContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    data: PropTypes.string,
  }).isRequired,
  index: PropTypes.string,
};

export default ViewContent;
