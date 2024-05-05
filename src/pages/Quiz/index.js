import React, { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";
import MDSwitch from "components/MDSwitch";

import { Link, useParams } from "react-router-dom";

// Images
import bgImage from "assets/front/images/bg-presentation.jpg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { fetchObjects } from "api.js";

import { Icon } from "@mui/material";
import MDBox from "components/MDBox";
import QuestionsDisplay from "./sections/QuestionsDisplay";
import { useAuth } from "context/authContext";

function Quiz() {
  const { id } = useParams();
  const { token } = useAuth();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handle = useFullScreenHandle();

  // fetch quiz data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchObjects("quize/questions/" + id, token);
        setData(fetchedData.quize);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, [id, token]);

  return (
    <>
      <MKBox
        minHeight="50px"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
        }}
      >
        <MKBox px={3} display="flex" justifyContent="space-between" alignItems="center">
          <MKBox>
            <MDTypography variant="button h2" fontWeight="bold" color="white">
              MAJID
            </MDTypography>
            <MDTypography variant="button h2" fontWeight="light" color="white">
              Learn
            </MDTypography>
          </MKBox>
          <MKBox display="flex" justifyContent="space-between" alignItems="center">
            <MDSwitch />
            <MDTypography
              variant="h2 button"
              fontWeight="bold"
              mt={1}
              component={Link}
              to="/learning"
              color="white"
            >
              <Icon sx={{ ml: 2 }} fontSize="xl3">
                close
              </Icon>
            </MDTypography>
          </MKBox>
        </MKBox>
      </MKBox>
      <MKBox component="section" mx={3}>
        <MKBox display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <MDTypography variant="h6" fontWeight="medium">
            Quize Title
          </MDTypography>
          <MDTypography variant="button h6" fontWeight="bold" onClick={handle.enter}>
            <Icon sx={{ mt: 0 }} fontSize="medium">
              fullscreen
            </Icon>
          </MDTypography>
        </MKBox>
        <Divider sx={{ mt: -0 }} />
        <FullScreen handle={handle}>
          {!isLoading ? <QuestionsDisplay questions={data.questions} /> : null}
        </FullScreen>
      </MKBox>
    </>
  );
}

export default Quiz;
