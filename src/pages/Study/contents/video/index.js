import React from "react";
import PropTypes from "prop-types";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import VideoContentCard from "pages/Study/contents/ContentCards/VideoContentCard";

function ViewContent({ data, index }) {
  return (
    <MDBox mt={2} mb={1}>
      <VideoContentCard
        title={index + " " + data.title}
        video={data.link}
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
  index: PropTypes.string,
};

export default ViewContent;
