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
import { Icon, Paper } from "@mui/material";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

import ScrollableBox from "pages/Study/sections/ScrollableBox";

function ContentDisplay() {
  // Sample course modules data
  const [modules, setModules] = useState(
    Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Module ${index + 1}`,
      content: `Content for Module ${index + 1}`,
    }))
  );

  // State to track selected module
  const [selectedModule, setSelectedModule] = useState(null);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    console.log(module);
  };

  return (
    <ScrollableBox sx={{ flex: "0 0 100%", px: 2 }}>
      {modules.map((module) => (
        <MKBox
          key={module.id}
          onClick={() => handleModuleClick(module)}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {module.title}
          </MDTypography>
          <MDTypography variant="h6" color="text" fontWeight="bold">
            <Icon>done</Icon>
          </MDTypography>
        </MKBox>
      ))}
    </ScrollableBox>
  );
}

export default ContentDisplay;
