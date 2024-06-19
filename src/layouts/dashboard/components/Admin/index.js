// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import ProgramProgress from "layouts/dashboard/components/ProgramProgress";
import { useAuth } from "context/authContext";
import { fetchObjects } from "api.js";
import { useState, useEffect } from "react";

function Admin() {
  const { token } = useAuth();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [programData, setProgramData] = useState();
  const [programId, setProgramId] = useState();

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await fetchObjects("admin/analytics", token);
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
        const data1 = await fetchObjects("program/students/" + programId, token);
        setProgramData(data1);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
      }
    };
    if (programId) fetchData();
  }, [programId]);

  const colors = ["info", "success", "dark", "primary"];
  let i = 0;

  const renderData = isLoading ? (
    <div />
  ) : (
    data.programs.map(({ id, name, enrollments }) => (
      <Grid item xs={12} md={6} key={id}>
        <MDBox mb={3}>
          <ReportsLineChart
            id={id}
            setId={setProgramId}
            color={i > 3 ? colors[0] : colors[i++]}
            title={name}
            description={
              <>
                <strong></strong>
              </>
            }
            date="updated 3 min ago"
            chart={enrollments}
          />
        </MDBox>
      </Grid>
    ))
  );

  console.log(programId);
  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="folder_special"
              title="Programs"
              count={data.programs.length}
              percentage={{
                color: "success",
                amount: "",
                label: "Active programs",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="groups"
              title="Students"
              count={data.counts.student}
              percentage={{
                color: "success",
                amount: "",
                label: "Total students",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="people"
              title="Instructors"
              count={data.counts.teacher}
              percentage={{
                color: "success",
                amount: "",
                label: "Total instructors",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person"
              title="Admins"
              count={data.counts.admin}
              percentage={{
                color: "success",
                amount: "",
                label: "Total adminstrators",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          {renderData}
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {programData && <ProgramProgress data={programData} />}
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Admin;
