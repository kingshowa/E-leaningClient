// react-routers components
import { Link } from "react-router-dom";
import { useState } from "react";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import NotificationItem from "examples/Items/NotificationItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import { useAuth } from "context/authContext";
import { postData, deleteObject } from "api.js";
import { DeleteOutline } from "@mui/icons-material";

function MessageMenu({ children, msId, sender, toDelete, total_likes }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const { token } = useAuth();

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleLike = () => {
    const url = liked ? "message/unlike/" + msId : "message/like/" + msId;
    const saveData = async () => {
      try {
        const responseData = await postData({}, url, token);
        console.log("Data saved successfully:", responseData);
        // Navigate to another page after successful data saving
        console.log("Liked: " + msId);
        setLiked(!liked);
        handleCloseMenu();
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };
    saveData();
  };

  const handleDelete = () => {
    const url = "message/" + msId;
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
      <MDBox mt={0.5} display="flex" justifyContent="space-between">
        <MDTypography variant="caption" color="white" fontSize="light">
          {sender.name}&nbsp;{sender.surname}
        </MDTypography>
        <MDBox mt={-1.3} mr={-1}>
          <IconButton size="small" color="white" disableRipple onClick={handleOpenMenu}>
            <Icon>more_vert</Icon>
          </IconButton>
        </MDBox>
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
        <IconButton size="small" color="white" disableRipple onClick={() => handleLike(msId)}>
          <Icon>favorite</Icon>
        </IconButton>
        {toDelete && (
          <IconButton size="small" color="white" disableRipple onClick={() => handleDelete(msId)}>
            <Icon>delete</Icon>
          </IconButton>
        )}
      </Menu>
      {children}
      {total_likes > 0 && (
        <MDBox my={-2} ml={-4}>
          <MDTypography variant="" color={liked ? "primary" : "text"}>
            <Icon>favorite</Icon>
          </MDTypography>
          <MDTypography variant="caption" color="white">
            {total_likes}
          </MDTypography>
        </MDBox>
      )}
    </>
  );
}

// Typechecking props for the messagesList
MessageMenu.propTypes = {
  msId: PropTypes.number.isRequired,
  sender: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
  }),
  toDelete: PropTypes.bool,
  children: PropTypes.node,
  total_likes: PropTypes.number,
};

export default MessageMenu;
