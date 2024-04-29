// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DeleteModal from "layouts/contents/data/questions/deleteModal";

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
    { Header: "no", accessor: "no", width: "2%", align: "left" },
    { Header: "question", accessor: "question", width: "70%", align: "left" },
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
      question: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.context}
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
          <Tooltip title="View Content" placement="top">
            <MDTypography component={Link} to={"/question?id=" + item.id} color="text">
              <Icon fontSize="small"> visibility </Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Edit Content" placement="top">
            <MDTypography component={Link} to={"/question?id=" + item.id + "&state=1"} color="text">
              <Icon fontSize="small">edit</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete Content" placement="top">
            <DeleteModal
              name="question"
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
