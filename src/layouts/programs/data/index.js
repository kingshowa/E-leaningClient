// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import DeleteModal from "layouts/programs/data/deleteModal";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Images
import team2 from "assets/images/team-2.jpg";

// react-router-dom components
import { Link } from "react-router-dom";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";

function getColumns() {
  return [
    { Header: "#", accessor: "no", width: "2%", align: "left" },
    { Header: "Program", accessor: "program", width: "30%", align: "left" },
    { Header: "Price", accessor: "price", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Complete", accessor: "complete", align: "center" },
    { Header: "Action", accessor: "action", align: "left" },
  ];
}

function getRows({ items, setData, parent_id }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  let pRow = [];
  let index = 1;
  items.forEach(function (item) {
    pRow.push({
      no: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index++}
        </MDTypography>
      ),
      program: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.name}
        </MDTypography>
      ),
      price: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.price}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.enabled ? "enbled" : "disabled"}
            color={item.enabled ? "success" : "dark"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      complete: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.completed ? "yes" : "no"}
            color={item.completed ? "success" : "dark"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <MDBox
          display="flex"
          justifyContent="space-between"
          ml="auto"
          lineHeight={0}
          color={darkMode ? "white" : "dark"}
        >
          <Tooltip title="View Program" placement="top">
            <MDTypography component={Link} to={"/programs/program?id=" + item.id} color="text">
              <Icon fontSize="small">visibility</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Edit Program" placement="top">
            <MDTypography
              component={Link}
              to={"/programs/program?id=" + item.id + "&state=1"}
              color="text"
            >
              <Icon fontSize="small">edit</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete Program" placement="top">
            <DeleteModal
              name="program"
              restore={true}
              id={item.id}
              setData={setData}
              parent_id={parent_id}
            />
          </Tooltip>
        </MDBox>
      ),
    });
  });

  return [...pRow];
}

getRows.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  setData: PropTypes.func,
  parent_id: PropTypes.number,
};

export { getColumns, getRows };
