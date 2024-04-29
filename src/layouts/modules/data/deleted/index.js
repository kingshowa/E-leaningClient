// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import DeleteModal from "layouts/modules/data/deleted/deleteModal";
import RestoreModal from "layouts/modules/data/deleted/restoreModal";

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
    { Header: "module", accessor: "module", width: "30%", align: "left" },
    { Header: "code", accessor: "code", align: "left" },
    { Header: "duration", accessor: "duration", align: "left" },
    { Header: "action", accessor: "action", align: "left" },
  ];
}

function getDelRows({ items, setData, parent_id }) {
  // const [controller] = useMaterialUIController();
  // const { darkMode } = controller;
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
          {item.level}
        </MDTypography>
      ),
      action: (
        <MDBox
          display="flex"
          justifyContent="space-between"
          ml="auto"
          lineHeight={0}
          color={"dark"}
        >
          <Tooltip title="Restore Module" placement="top">
            <RestoreModal
              name="module"
              restore={false}
              id={item.id}
              setData={setData}
              parent_id={parent_id}
            />
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete Module" placement="top">
            <DeleteModal
              name="module"
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
