// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import DeleteModal from "layouts/users/data/deleted/deleteModal";
import RestoreModal from "layouts/users/data/deleted/restoreModal";

// @mui material components
import Tooltip from "@mui/material/Tooltip";

import PropTypes from "prop-types";

function getDelColumns() {
  return [
    { Header: "#", accessor: "no", width: "2%", align: "left" },
    { Header: "User", accessor: "user", width: "30%", align: "left" },
    { Header: "role", accessor: "role", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Action", accessor: "action", align: "left" },
  ];
}

function getDelRows({ items, setData, parent_id }) {
  const User = (image, name) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  let pRow = [];
  let index = 1;
  items.forEach(function (item) {
    pRow.push({
      no: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {index++}
        </MDTypography>
      ),
      user: <User image={item.photo} name={item.name + " " + item.surname} />,
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
          <Tooltip title="Restore User" placement="top">
            <RestoreModal
              name="user"
              restore={false}
              id={item.id}
              setData={setData}
              parent_id={parent_id}
            />
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete User" placement="top">
            <DeleteModal
              name="user"
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
