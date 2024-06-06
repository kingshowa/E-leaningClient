// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";
import MDSwitch from "components/MDSwitch";

import { Link, useNavigate } from "react-router-dom";

// Images
import bgImage from "assets/front/images/bg-presentation.jpg";
import React, { useState } from "react";
import PropTypes from "prop-types";

import { Icon } from "@mui/material";

function CourseNavBar({ courseId, courseName, isStudy }) {
  const [roomId, setRoomId] = useState();
  // const navigate = useNavigate();

  // const handleVideoChat = (cId) => {
  //   console.log("Started Video in course: " + cId);
  //   // some logic to permit users to join here
  //   navigate("/room/" + cId);
  // };

  return (
    <>
      <MKBox
        minHeight="50px"
        width="100%"
        sx={{
          // backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          //   `${linearGradient(
          //     rgba(gradients.dark.main, 0.6),
          //     rgba(gradients.dark.state, 0.6)
          //   )}, url(${bgImage})`,
          backgroundColor: "#841317",
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
        }}
      >
        <MKBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mx: { xs: 1, md: 3 } }}
        >
          <MKBox>
            <MDTypography variant="button h2" fontWeight="bold" color="white">
              ATM {""}
            </MDTypography>
            <MDTypography variant="button h2" fontWeight="light" color="white">
              Learning
            </MDTypography>
          </MKBox>
          <MDTypography
            color="white"
            variant="h6"
            fontWeight="medium"
            sx={{ display: { xs: "none", md: "block" }, mr: "20%" }}
          >
            {courseName}
          </MDTypography>
          <MKBox display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography
              variant="h2 button"
              fontWeight="bold"
              mt={1}
              sx={{ mr: { xs: 1, md: 2 } }}
              component={Link}
              to={"/room/" + courseId}
              color="white"
            >
              <Icon sx={{ ml: 2 }} fontSize="xl3">
                video_chat
              </Icon>
            </MDTypography>
            <MDTypography
              variant="h2 button"
              fontWeight="bold"
              mt={1}
              sx={{ mr: { xs: 1, md: 3 } }}
              component={Link}
              to={isStudy ? "/discussion/" + courseId : "/course/study/" + courseId}
              color="white"
            >
              <Icon sx={{ ml: 2 }} fontSize="xl3">
                {isStudy ? "question_answer" : "auto_stories"}
              </Icon>
            </MDTypography>
            <MDSwitch />
            <MDTypography
              variant="h2 button"
              fontWeight="bold"
              mt={1}
              component={Link}
              to={isStudy ? "/learning" : "/course/study/" + courseId}
              color="white"
            >
              <Icon sx={{ ml: 2 }} fontSize="xl3">
                close
              </Icon>
            </MDTypography>
          </MKBox>
        </MKBox>
      </MKBox>
    </>
  );
}

CourseNavBar.propTypes = {
  courseId: PropTypes.number,
  courseName: PropTypes.string,
  isStudy: PropTypes.bool,
};
export default CourseNavBar;
