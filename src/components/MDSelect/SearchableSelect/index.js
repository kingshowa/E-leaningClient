import React, { useState } from "react";
import { MenuItem } from "@mui/material";

import MDSelect from "components/MDSelect";
import MDInput from "components/MDInput";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const SearchableSelect = ({ options, name, val, title, setValue }) => {
  //const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [displayedOptions, setDisplayedOptions] = useState(options.slice(val, val + 5)); // Initial display limit

  const handleSearchChange = (event) => {
    const inputText = event.target.value.toLowerCase();
    setSearchText(inputText);

    // Filter options based on search text
    const filteredOptions = options.filter((option) =>
      option.name.toLowerCase().includes(inputText)
    );

    // Update displayed options with limited size
    setDisplayedOptions(filteredOptions.slice(0, 5)); // Limit displayed options to 5
  };

  const handleChange = (event) => {
    setSearchText("");
    const selectedId = event.target.value;
    setValue(selectedId);
    console.log("Selected ID:", selectedId);
  };

  // Typechecking props for the MDInput
  SearchableSelect.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    title: PropTypes.string,
    val: PropTypes.number,
    setValue: PropTypes.func,
  };

  SearchableSelect.defaultProps = {
    val: 0,
    title: " ",
  };

  return (
    <>
      <MDSelect
        id="searchable-select"
        name={name}
        defaultValue={val === 0 ? " " : val}
        onChange={handleChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 290, // Limit max height of dropdown menu
            },
          },
        }}
      >
        <MDInput
          onChange={handleSearchChange}
          value={searchText}
          placeholder="Search here"
          fullWidth
        />
        <MenuItem value=" "> -- {title} --</MenuItem>
        {displayedOptions.map((option, index) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </MDSelect>
    </>
  );
};

export default SearchableSelect;
