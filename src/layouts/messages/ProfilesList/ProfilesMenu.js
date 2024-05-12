import { useState } from "react";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { useAuth } from "context/authContext";
import { deleteObject } from "api.js";

function PostMenu({ psId }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { token } = useAuth();

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleDelete = () => {
    const url = "chat/" + psId;
    const saveData = async () => {
      try {
        const responseData = await deleteObject(url, token);
        console.log("Data deleted successfully:", responseData);
        handleCloseMenu();
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };
    saveData();
  };

  return (
    <>
      <MDBox mt={-1.3} mr={-1}>
        <IconButton size="medium" disableRipple onClick={handleOpenMenu} color="text">
          <Icon>more_vert</Icon>
        </IconButton>
      </MDBox>
      <Menu
        anchorEl={openMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        sx={{ mt: -1.7, width: "100px" }}
      >
        <IconButton size="small" color="white" disableRipple onClick={() => handleDelete()}>
          <Icon>delete</Icon>
        </IconButton>
      </Menu>
    </>
  );
}

// Typechecking props for the messagesList
PostMenu.propTypes = {
  psId: PropTypes.number.isRequired,
};

export default PostMenu;
