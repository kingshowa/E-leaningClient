import React from "react";
import PropTypes from "prop-types";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import ImageContentCard from "pages/Study/contents/ContentCards/ImageContentCard";

function ViewContent({ data }) {
  return (
    <MDBox mt={2} mb={1}>
      <ImageContentCard
        title={data.title}
        image={data.link}
        caption={data.caption}
        shadow={false}
      />
    </MDBox>
  );
}

ViewContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    link: PropTypes.string,
    caption: PropTypes.string,
  }).isRequired,
};
export default ViewContent;
