// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";

import DeleteModal from "layouts/users/data/deleteModal";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// react-router-dom components
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

function getColumns() {
  return [
    { Header: "#", accessor: "no", width: "2%", align: "left" },
    { Header: "User", accessor: "user", width: "30%", align: "left" },
    { Header: "role", accessor: "role", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "phone No", accessor: "phone", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Action", accessor: "action", align: "left" },
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
      user: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar bgColor="dark" src={item.photo} name={item.name} size="sm" />
          &nbsp;&nbsp;&nbsp;
          <MDTypography display="block" variant="button" fontWeight="medium">
            {item.name + " " + item.surname}
          </MDTypography>
        </MDBox>
      ),
      role: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.role}
        </MDTypography>
      ),
      email: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.email}
        </MDTypography>
      ),
      phone: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {item.phone}
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
      action: (
        <MDBox
          display="flex"
          justifyContent="space-between"
          ml="auto"
          lineHeight={0}
          color={"dark"}
        >
          <Tooltip title="View User" placement="top">
            <MDTypography component={Link} to={"/users/user?id=" + item.id} color="text">
              <Icon fontSize="small">visibility</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete User" placement="top">
            <DeleteModal
              name="user"
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
