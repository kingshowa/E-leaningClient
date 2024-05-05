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
import PropTypes from "prop-types";

function ModulesSideNav({ modules, setActiveModule, setIndex }) {
  const handleModuleClick = (module, index) => {
    setActiveModule(module.id);
    setIndex(index);
  };

  return (
    <>
      <MDTypography variant="h6">Course Outline</MDTypography>
      <Divider sx={{ mt: 1 }} />
      <ScrollableBox sx={{ flex: "0 0 30%", maxHeight: "77vh" }}>
        {modules.map((module, index) => (
          <MKBox
            key={module.id}
            onClick={() => handleModuleClick(module, index + 1)}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              cursor: "pointer",
              paddingY: "10px",
              "&:hover": {
                backgroundColor: "inherit",
                outline: "1px solid grey", // Change color and size as needed
              },
            }}
          >
            <MDTypography variant="caption" fontWeight="medium">
              {String(index + 1) + ". " + module.name}
            </MDTypography>
            <MDTypography variant="h6" color="text" fontWeight="bold" mr={2}>
              <Icon>{module.progress ? "task_alt" : "panorama_fish_eye"}</Icon>
            </MDTypography>
          </MKBox>
          // <SidenavCollapse name={module.title} icon="done" active={false} key={module.id} />
        ))}
      </ScrollableBox>
    </>
  );
}

ModulesSideNav.propTypes = {
  modules: PropTypes.array.isRequired,
  setActiveModule: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
};
export default ModulesSideNav;
