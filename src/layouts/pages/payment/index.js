import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import PaymentForm from "pages/Program/PaymentMethod";

function Basic() {
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox p={2}>
          <PaymentForm />
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
