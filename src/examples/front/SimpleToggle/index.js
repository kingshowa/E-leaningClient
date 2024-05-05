import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabsSimple({ setToggleState }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabType = (event, newValue) => setActiveTab(newValue);

  return (
    <Grid container item xs={12} lg={3}>
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabType}>
          <Tab label="In Progress" onClick={() => setToggleState(0)} />
          <Tab label="Completed" onClick={() => setToggleState(1)} />
        </Tabs>
      </AppBar>
    </Grid>
  );
}

TabsSimple.propTypes = {
  setToggleState: PropTypes.func,
};
export default TabsSimple;
