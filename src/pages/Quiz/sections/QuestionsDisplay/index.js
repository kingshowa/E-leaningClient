// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";

import React from "react";
import PropTypes from "prop-types";

import Question from "../Question";
import Options from "../Options";

function QuestionsDisplay({ data, setData, isSaved }) {
  const questions = data.questions;
  return (
    <>
      <MDTypography variant="body1" color="text" fontWeight="light" mb={2}>
        {data.instruction}
      </MDTypography>
      {questions.map((question, index) => (
        <MKBox key={question.id} pb={2}>
          <Question index={index} context={question.context} image={question.imageUrl} />
          <Options options={question.options} p_index={index} setData={setData} isSaved={isSaved} />
        </MKBox>
      ))}
    </>
  );
}

QuestionsDisplay.propTypes = {
  data: PropTypes.shape({
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        context: PropTypes.string,
        imageUrl: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ),
    instruction: PropTypes.string,
  }).isRequired,
  setData: PropTypes.func,
  isSaved: PropTypes.bool,
};

export default QuestionsDisplay;
