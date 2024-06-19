// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Admin from "layouts/dashboard/components/Admin";
import Teacher from "layouts/dashboard/components/Teacher";

import { useAuth } from "context/authContext";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const { role, token } = useAuth();
  console.log(token);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {role == "admin" && <Admin />}
      {role == "teacher" && <Teacher />}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
