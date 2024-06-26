// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DeleteModal from "layouts/contents/data/deleteModal";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// react-router-dom components
import { Link } from "react-router-dom";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";

function downloadDocument(url, name) {
  console.log("Downloading: " + url);
  // Create a hidden link element
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = name || "document"; // Set the download attribute with a filename

  // Append the link to the body and trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Clean up
}

function getColumns() {
  return [
    { Header: "no", accessor: "no", width: "2%", align: "left" },
    { Header: "title", accessor: "title", width: "30%", align: "left" },
    { Header: "type", accessor: "type", align: "left" },
    { Header: "duration", accessor: "duration", align: "left" },
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
      title: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.title}
        </MDTypography>
      ),
      type: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.type}
        </MDTypography>
      ),
      duration: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.duration} Min
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
            <MDTypography
              component={item.type == "document" ? "a" : Link}
              onClick={
                item.type == "document" ? () => downloadDocument(item.link, item.type) : null
              }
              to={"/" + item.type + "-content?id=" + item.id}
              color="text"
            >
              <Icon fontSize="small">{item.type == "document" ? "download" : "visibility"}</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Edit Content" placement="top">
            <MDTypography
              component={Link}
              to={
                item.type == "document"
                  ? "/edit-document?id=" + item.id + "&m=" + parent_id
                  : "/" + item.type + "-content?id=" + item.id + "&state=1"
              }
              color="text"
            >
              <Icon fontSize="small">edit</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete Content" placement="top">
            <DeleteModal
              name="content"
              restore={false}
              id={item.content_id}
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
downloadDocument.propTypes = {
  url: PropTypes.string,
};

export { getColumns, getRows };
