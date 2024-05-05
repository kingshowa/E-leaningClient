import React from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import QuizInfoCard from "pages/Study/contents/ContentCards/QuizInfoCard";

function ViewContent({ data, index }) {
  return (
    <MDBox mt={2} mb={1}>
      <QuizInfoCard
        id={data.id}
        title={index + " " + data.title}
        instruction={data.instruction}
        info={{
          duration: data.duration + " Minutes",
          pass_mark: data.pass_percentage + " %",
        }}
        shadow={false}
      />
    </MDBox>
  );
}

ViewContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    instruction: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.number,
    pass_percentage: PropTypes.number,
  }).isRequired,
  index: PropTypes.string,
};

export default ViewContent;
