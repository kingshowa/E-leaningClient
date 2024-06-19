// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import CourseProgress from "layouts/dashboard/components/CourseProgress";
import { useAuth } from "context/authContext";
import { fetchObjects } from "api.js";
import { useState, useEffect } from "react";

function Teacher() {
  const { token } = useAuth();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [courseData, setCourseData] = useState();
  const [courseId, setCourseId] = useState();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchObjects("teacher/analytics", token);
        setData(data1);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    fetchData();
  }, []);

  // fetch progress data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchObjects("course/students/" + courseId, token);
        setCourseData(data1);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    if (courseId) fetchData();
  }, [courseId]);

  const colors = ["info", "success", "dark", "primary"];
  let i = 0;

  const renderData = isLoading ? (
    <div />
  ) : (
    data.courses.map(({ id, name, enrollments }) => (
      <Grid item xs={12} md={6} key={id}>
        <MDBox mb={3}>
          <ReportsLineChart
            id={id}
            setId={setCourseId}
            color={i > 3 ? colors[0] : colors[i++]}
            title={name}
            description={
              <>
                <strong></strong>
              </>
            }
            date="updated 4 days ago"
            chart={enrollments}
          />
        </MDBox>
      </Grid>
    ))
  );
  console.log(courseId);
  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="auto_stories"
              title="Courses"
              count={data.courses.length}
              percentage={{
                color: "success",
                amount: "",
                label: "Managed courses",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="style"
              title="Modules"
              count={data.modulesCount}
              percentage={{
                color: "success",
                amount: "",
                label: "Managed modules",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="groups"
              title="Students"
              count={data.studentsCount}
              percentage={{
                color: "success",
                amount: "",
                label: "Total students taught",
              }}
            />
          </MDBox>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="folder_special"
              title="Programs"
              count={2}
              percentage={{
                color: "success",
                amount: "",
                label: "All created programs",
              }}
            />
          </MDBox>
        </Grid> */}
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          {renderData}
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {courseData && <CourseProgress data={courseData} />}
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Teacher;
