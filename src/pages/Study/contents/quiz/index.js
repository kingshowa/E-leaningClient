import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Pagination from "components/MDPagination/Pagination";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import QuizInfoCard from "pages/Study/contents/ContentCards/QuizInfoCard";

// react-router-dom components
import { Link } from "react-router-dom";
// Overview page components
import Header from "layouts/programs/components/Header/Header1";
//css
import "assets/css/style.css";

// Data
import { getColumns, getRows } from "layouts/contents/data/questions";

import quiz from "assets/json/quiz.json";
import { fetchObjects, editData } from "api.js";
import { useAuth } from "context/authContext";
import { duration } from "@mui/material";

function ViewContent({ data }) {
  // const { token } = useAuth();

  // // Get params from url
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const id = Number(searchParams.get("id"));
  // const state = Number(searchParams.get("state"));

  // const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // // fetch data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data1 = await fetchObjects("quize/questions/" + id, token);
  //       setData(data1.quize);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch objects:", error);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  // // Courses table
  // const columns = getColumns();
  // const rows = data ? getRows({ items: data.questions, setData, parent_id: id }) : []; //  courses is an array not object

  // // Paginations
  // const [currentPage, setCurrentPage] = useState(1);
  // const rowsPerPage = 5; // Number of rows per page
  // const totalPages = () => {
  //   return Math.ceil(rows.length / rowsPerPage); // Use Math.ceil to round up to the nearest whole number
  // };
  // const startIndex = (currentPage - 1) * rowsPerPage;
  // const visibleRows = rows.slice(startIndex, startIndex + rowsPerPage);

  // // togle tabs
  // const [toggleState, setToggleState] = useState(state);

  // // Update data management
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(data);
  //   if (data != null) {
  //     const url = "content/quize/edit/" + id;
  //     const saveData = async () => {
  //       try {
  //         const responseData = await editData(data, url, token);
  //         console.log("Data saved successfully:", responseData);
  //         // Navigate to another page after successful data saving
  //         setToggleState(0);
  //       } catch (error) {
  //         console.error("Error posting data:", error.message);
  //       }
  //     };
  //     saveData();
  //   }
  // };

  return (
    <MDBox mt={5} mb={2}>
      <QuizInfoCard
        title={data.content.title}
        instruction={data.instruction}
        info={{
          questions: data.questions.length,
          duration: data.content.duration + " Minutes",
          pass_mark: data.pass_percentage + " %",
        }}
        shadow={false}
      />
    </MDBox>
  );
}

ViewContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    instruction: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.object),
    content: PropTypes.shape({
      title: PropTypes.string,
      duration: PropTypes.number,
    }),
    pass_percentage: PropTypes.number,
  }).isRequired,
};

export default ViewContent;
