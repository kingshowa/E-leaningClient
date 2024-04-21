// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DeleteModal from "layouts/modules/data/deleteModal";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// react-router-dom components
import { Link } from "react-router-dom";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";

function getColumns() {
  return [
    { Header: "#", accessor: "no", width: "2%", align: "left" },
    { Header: "module", accessor: "module", width: "30%", align: "left" },
    { Header: "code", accessor: "code", align: "left" },
    { Header: "duration", accessor: "duration", align: "left" },
    { Header: "action", accessor: "action", align: "left" },
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
      module: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.name}
        </MDTypography>
      ),
      code: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.code}
        </MDTypography>
      ),
      duration: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.duration} Hours
        </MDTypography>
      ),
      action: (
        <MDBox
          display="flex"
          justifyContent="space-between"
          ml="auto"
          lineHeight={0}
          color={darkMode ? "white" : "dark"}
        >
          <Tooltip title="View Module" placement="top">
            <MDTypography component={Link} to={"/modules/module?id=" + item.id} color="text">
              <Icon fontSize="small">visibility</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Edit Module" placement="top">
            <MDTypography
              component={Link}
              to={"/modules/module?id=" + item.id + "&state=1"}
              color="text"
            >
              <Icon fontSize="small">edit</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete Module" placement="top">
            <DeleteModal
              name="module"
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
