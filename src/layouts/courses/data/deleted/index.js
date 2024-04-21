// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import DeleteModal from "layouts/courses/data/deleted/deleteModal";
import RestoreModal from "layouts/courses/data/deleted/restoreModal";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// react-router-dom components
import { Link } from "react-router-dom";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";

function getDelColumns() {
  return [
    { Header: "#", accessor: "no", width: "2%", align: "left" },
    { Header: "Course", accessor: "course", width: "30%", align: "left" },
    { Header: "Code", accessor: "code", align: "left" },
    { Header: "Level", accessor: "level", align: "left" },
    { Header: "Price", accessor: "price", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Complete", accessor: "complete", align: "center" },
    { Header: "Action", accessor: "action", align: "left" },
  ];
}

function getDelRows({ items, setData, parent_id }) {
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
      course: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.name}
        </MDTypography>
      ),
      code: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.code}
        </MDTypography>
      ),
      level: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.level}
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
          <Tooltip title="Restore Program" placement="top">
            <RestoreModal
              name="course"
              restore={false}
              id={item.id}
              setData={setData}
              parent_id={parent_id}
            />
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete Program" placement="top">
            <DeleteModal
              name="course"
              restore={false}
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

getDelRows.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  setData: PropTypes.func,
  parent_id: PropTypes.number,
};

export { getDelColumns, getDelRows };
