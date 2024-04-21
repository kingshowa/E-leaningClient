// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import MDPagination from "components/MDPagination";

// @mui material components
import Icon from "@mui/material/Icon";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Deactivate all pagination items
    const paginationItems = document.querySelectorAll(".md-pagination-item");
    paginationItems.forEach((item) => {
      item.style.background = "transparent";
    });
    // Activate the clicked pagination item
    const activePaginationItem = document.querySelector("#pagination-item-" + newPage);
    if (activePaginationItem) {
      activePaginationItem.style.background = "#2a9df4";
    }
  };

  return (
    <MDPagination>
      <MDPagination item onClick={() => handlePageChange(currentPage == 1 ? 1 : currentPage - 1)}>
        <Icon>keyboard_arrow_left</Icon>
      </MDPagination>
      <MDPagination
        item
        style={{ background: "#2a9df4" }}
        id="pagination-item-1"
        className="md-pagination-item"
        onClick={() => handlePageChange(1)}
      >
        1
      </MDPagination>
      {Array.from({ length: totalPages() - 1 }, (_, index) => (
        <MDPagination
          key={index + 2}
          item
          id={"pagination-item-" + (index + 2)}
          className="md-pagination-item"
          onClick={() => handlePageChange(index + 2)}
        >
          {index + 2}
        </MDPagination>
      ))}
      <MDPagination
        item
        onClick={() =>
          handlePageChange(currentPage == totalPages() ? totalPages() : currentPage + 1)
        }
      >
        <Icon>keyboard_arrow_right</Icon>
      </MDPagination>
    </MDPagination>
  );
};

// Typechecking props for the Pagination
Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default Pagination;
