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
import MessageMenu from "./MessageMenu";

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

function MessagesList({ userId, messages, shadow }) {
  const renderMessages = messages.map(({ id, text, attachment, sender, total_likes }) => (
    <MDBox key={id} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <MDBox
        mr={2}
        ml={userId == sender.id ? "auto" : ""}
        display="flex"
        bgColor="info" // Background color
        color="info.contrastText" // Text color
        p={2} // Padding
        borderRadius={8} // Border radius
        boxShadow={3} // Box shadow
        maxWidth={400} // Max width
      >
        <MDBox mr={1}>
          <MDAvatar bgColor="dark" src={sender.photo1} alt={sender.name} shadow="md" size="xs" />
        </MDBox>
        <MDBox>
          <MessageMenu
            msId={id}
            sender={sender}
            toDelete={userId == sender.id}
            total_likes={total_likes}
          >
            <MDBox>
              {attachment ? (
                <MDTypography
                  variant="button"
                  color="white"
                  component="a"
                  onClick={() => downloadDocument(attachment, "Attachment")}
                >
                  Download Attachment&nbsp;
                  {<Icon fontSize="small">download</Icon>}
                </MDTypography>
              ) : (
                <MDTypography variant="button" color="white">
                  {text}
                </MDTypography>
              )}
            </MDBox>
          </MessageMenu>
        </MDBox>
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox p={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{
            listStyleType: "none",
          }}
        >
          {renderMessages}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the messagesList
MessagesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the messagesList
MessagesList.propTypes = {
  userId: PropTypes.number.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default MessagesList;
