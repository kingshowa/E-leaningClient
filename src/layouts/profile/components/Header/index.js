import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";

function Header({ children, state, setToggleState }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(state ? state : 0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <Card
        sx={{
          position: "relative",
          mt: 0,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  onClick={() => setToggleState(0)}
                  label="Profile"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      person
                    </Icon>
                  }
                />
                <Tab
                  onClick={() => setToggleState(1)}
                  label="Edit"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      edit
                    </Icon>
                  }
                />
                <Tab
                  onClick={() => setToggleState(2)}
                  label="Password"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      key
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
  state: 0,
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
  state: PropTypes.number,
  setToggleState: PropTypes.func,
};

export default Header;
