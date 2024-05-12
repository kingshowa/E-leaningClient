import React, { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";
import MDSwitch from "components/MDSwitch";
import MDButton from "components/MDButton";
import ScrollableBox from "pages/Study/sections/ScrollableBox";
import Footer from "layouts/authentication/components/Footer";

import { Link, useParams } from "react-router-dom";

// Images
import bgImage from "assets/front/images/bg-presentation.jpg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { fetchObjects, postData } from "api.js";

import { Icon } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import QuestionsDisplay from "./sections/QuestionsDisplay";
import { useAuth } from "context/authContext";
import CourseNavBar from "pages/Study/sections/CourseNavBar.js";

function Quiz() {
  const { id, courseId } = useParams();
  const { token } = useAuth();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handle = useFullScreenHandle();

  const [isChecked, setIsChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [totalMark, setTotalMark] = useState();

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

  const handleSubmit = () => {
    if (isChecked) {
      data.course_id = Number(courseId);
      console.log(data);
      setIsSaved(true);
      const url = "quize/marks/" + id;
      const saveData = async () => {
        try {
          const responseData = await postData(data, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          setTotalMark(responseData.remarks);
          setIsSaved(true);
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <CourseNavBar courseId={courseId} courseName={!isLoading ? data.title : ""} />
      <MKBox component="section" sx={{ mx: { xs: 1, md: 3 } }}>
        <MKBox display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <MDTypography variant="h6" fontWeight="medium">
            {data ? data.title : ""}
          </MDTypography>
          <MDTypography variant="button h6" fontWeight="bold" onClick={handle.enter}>
            <Icon sx={{ mt: 0 }} fontSize="medium">
              fullscreen
            </Icon>
          </MDTypography>
        </MKBox>
        <Divider sx={{ mt: -0 }} />
        <FullScreen handle={handle}>
          <Card>
            <ScrollableBox
              sx={{
                flex: "0 0 100%",
                py: 3,
                px: { xs: 1, md: 3 },
                minHeight: "100vh",
                maxHeight: "100vh",
              }}
            >
              {!isLoading ? (
                <QuestionsDisplay data={data} setData={setData} isSaved={isSaved} />
              ) : null}
              <MKBox my={5} ml={1}>
                <MKBox mt={1} display="flex">
                  <MKBox mt={-1}>
                    <CheckBox
                      checked={isChecked}
                      onChange={() => handleChange()}
                      disabled={isSaved}
                    />
                  </MKBox>
                  <MDTypography variant="body2" color="text" fontWeight="light" mt={-0.3}>
                    &nbsp;&nbsp;I agree to submit my answers!
                  </MDTypography>
                </MKBox>
                <MKBox mt={2} ml={1} display="flex">
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <MDButton color="dark" onClick={handleSubmit} disabled={isSaved}>
                        submit excercise
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDTypography variant="body2" fontWeight="light">
                        {isSaved ? totalMark : ""}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MKBox>
              </MKBox>
            </ScrollableBox>
          </Card>
        </FullScreen>
      </MKBox>
      <MKBox px={1} mt={3}>
        <Footer />
      </MKBox>
    </>
  );
}

export default Quiz;
