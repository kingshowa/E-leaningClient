import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { postData } from "api.js";

function Basic() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState();

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <div>
          <p>Kingstone showa</p>
        </div>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
