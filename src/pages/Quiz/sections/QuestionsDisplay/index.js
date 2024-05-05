// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";
import MKButton from "components/MKButton";

import React, { useState } from "react";
import PropTypes from "prop-types";

import ScrollableBox from "pages/Study/sections/ScrollableBox";
import Question from "../Question";
import Options from "../Options";

function QuestionsDisplay({ questions }) {
  return (
    <Card>
      <ScrollableBox sx={{ flex: "0 0 100%", p: 3, minHeight: "100vh", maxHeight: "100vh" }}>
        {questions.map((question, index) => (
          <MKBox key={question.id} pb={2}>
            <Question index={index + 1} context={question.context} image={question.imageUrl} />
            <Options options={question.options} p_index={index} />
          </MKBox>
        ))}
      </ScrollableBox>
    </Card>
  );
}

QuestionsDisplay.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      context: PropTypes.string,
      imageUrl: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default QuestionsDisplay;
