// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DeleteModal from "layouts/contents/data/options/deleteModal";

// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";

function getColumns() {
  return [
    { Header: "no", accessor: "no", width: "2%", align: "left" },
    { Header: "option", accessor: "option", width: "45%", align: "left" },
    { Header: "type", accessor: "type", align: "left" },
    { Header: "correct", accessor: "correct", align: "left" },
    { Header: "action", accessor: "action", align: "left" },
  ];
}

function getRows({ items, setData, parent_id }) {
  let pRow = [];
  let index = 1;
  items.forEach(function (item) {
    pRow.push({
      no: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index++}
        </MDTypography>
      ),
      option: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.type === "image" ? "Image option" : item.data}
        </MDTypography>
      ),
      type: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.type}
        </MDTypography>
      ),
      correct: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.isCorrect ? "Yes" : "No"}
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
          <Tooltip title="Delete Option" placement="top">
            <DeleteModal
              name="option"
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
