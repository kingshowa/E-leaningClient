import React from "react";
import PropTypes from "prop-types";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ImageContentCard from "pages/Study/contents/ContentCards/ImageContentCard";
import { Icon } from "@mui/material";
import { Link } from "react-router-dom";

function ViewContent({ data, index }) {
  function downloadDocument(url, name) {
    console.log("Downloading: " + url);
    // Create a hidden link element
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = name || "document"; // Set the download attribute with a filename

    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  }

  return (
    <>
      <MDBox mt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {index + " " + data.title}
        </MDTypography>
      </MDBox>
      <MDBox
        mt={2}
        mb={1}
        mx={2}
        p={1}
        component={Link}
        onClick={() => downloadDocument(data.link, data.type)}
        sx={{
          backgroundColor: "grey",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          borderRadius: "8px",
          textDecoration: "none",
          color: "inherit",
          "&:hover": {
            backgroundColor: "lightgrey",
          },
        }}
      >
        <MDTypography variant="h6" fontWeight="bold">
          {data.caption ? data.caption : data.title}
        </MDTypography>
        <Icon fontSize="medium">download</Icon>
      </MDBox>
    </>
  );
}

ViewContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    link: PropTypes.string,
    caption: PropTypes.string,
  }).isRequired,
  index: PropTypes.string,
};
export default ViewContent;
