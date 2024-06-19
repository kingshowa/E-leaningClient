// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// @mui material components
import Icon from "@mui/material/Icon";

// react-router-dom components
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const Course = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" variant="rounded" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  </MDBox>
);

Course.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};

function getColumns() {
  return [
    { Header: "#", accessor: "no", width: "2%", align: "left" },
    { Header: "Student", accessor: "user", width: "30%", align: "left" },
    { Header: "Enrolled on", accessor: "enrollment", align: "left" },
    { Header: "Updated on", accessor: "last_update", align: "left" },
    { Header: "Progress", accessor: "completion", align: "left" },
  ];
}

function getRows({ items }) {
  let pRow = [];
  let index = 1;
  items.forEach(function (item) {
    pRow.push({
      no: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index++}
        </MDTypography>
      ),
      user: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar bgColor="dark" src={item.user.photo} name={item.user.name} size="sm" />
          &nbsp;&nbsp;&nbsp;
          <MDTypography display="block" variant="button" fontWeight="medium">
            {item.user.name + " " + item.user.surname}
          </MDTypography>
        </MDBox>
      ),
      enrollment: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.enrollment_date}
        </MDTypography>
      ),
      last_update: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.last_update}
        </MDTypography>
      ),
      completion: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress
            value={item.progress}
            color={item.progress < 50 ? "primary" : "success"}
            variant="gradient"
            label={false}
          />
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
};

export { getColumns, getRows };
