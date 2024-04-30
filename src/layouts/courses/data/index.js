// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import DeleteModal from "layouts/courses/data/deleteModal";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

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
    { Header: "Course", accessor: "course", width: "30%", align: "left" },
    { Header: "Code", accessor: "code", align: "left" },
    { Header: "Level", accessor: "level", align: "left" },
    { Header: "Price", accessor: "price", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Complete", accessor: "complete", align: "center" },
    { Header: "Action", accessor: "action", align: "left" },
  ];
}

function getRows({ items, setData, parent_id, user }) {
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
          color={"dark"}
        >
          <Tooltip title="View Course" placement="top">
            <MDTypography component={Link} to={"/courses/course?id=" + item.id} color="text">
              <Icon fontSize="small">visibility</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Edit Course" placement="top">
            <MDTypography
              component={Link}
              to={"/courses/course?id=" + item.id + "&state=1"}
              color="text"
            >
              <Icon fontSize="small">edit</Icon>
            </MDTypography>
          </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete Course" placement="top">
            <DeleteModal
              name="course"
              restore={true}
              id={item.id}
              setData={setData}
              parent_id={parent_id}
              user={user}
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
  user: PropTypes.bool,
};

export { getColumns, getRows };
