import React, { useState, useEffect, useRef } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDHidenFileInput from "components/MDHidenFileInput";
import SearchableSelect from "components/MDSelect/SearchableSelect1";
import MDAvatar from "components/MDAvatar";

import ProfilesList from "../ProfilesList";
import MessagesList from "../MessagesList";

import ScrollableBox from "pages/Study/sections/ScrollableBox";

import { fetchObjects, postData } from "api.js";
import { useAuth } from "context/authContext";

function Messages() {
  const { token } = useAuth();

  const [selectedVal, setSelectedVal] = useState(0);

  const [usersData, setUsersData] = useState();
  const [chatData, setChatData] = useState();
  const [profilesData, setProfilesData] = useState();

  const [patnerId, setPatnerId] = useState();

  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(true);

  const scrollRef = useRef(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // fetch data
  useEffect(() => {
    fetchUsersData();
    fetchProfilesData();
    //if (patnerId) fetchChatData(patnerId);

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchProfilesData();
      //if (patnerId) fetchChatData(patnerId);
    }, 5000); // Interval in milliseconds (5 seconds)

    // Clean up the interval to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (patnerId) {
      fetchChatData(patnerId);
      setIsChatLoading(true);
      scrollToBottom();
    }
    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      if (patnerId) {
        fetchChatData(patnerId);
      }
    }, 5000); // Interval in milliseconds (5 seconds)

    // Clean up the interval to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, [patnerId]);

  // fetch data
  useEffect(() => {
    if (!isChatLoading) scrollToBottom();
  }, [isChatLoading]);

  // fetch data
  useEffect(() => {
    if (selectedVal > 0) setPatnerId(selectedVal);
  }, [selectedVal]);

  const fetchUsersData = async () => {
    try {
      const data1 = await fetchObjects("users", token);
      setUsersData(data1.users);
      setIsUsersLoading(false);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  };

  const fetchProfilesData = async () => {
    try {
      const data1 = await fetchObjects("message/chats", token);
      setProfilesData(data1.chats);
      setIsProfileLoading(false);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  };

  const fetchChatData = async (patnerId) => {
    try {
      const data = await fetchObjects("message/chat/" + patnerId, token);
      setChatData(data.chat);
      setIsChatLoading(false);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  };

  const [messageToSend, setMessageToSend] = useState(null);

  // Update data management
  const messageInputChange = (e) => {
    const { name, value } = e.target;
    setMessageToSend({ ...messageToSend, [name]: value });
    console.log(messageToSend);
  };

  const messageFileUpload = (file) => {
    setMessageToSend({ ...messageToSend, ["attachment"]: file, ["text"]: file.name });
    document.querySelector("#message").value = file.name;
  };

  const messageInputBlur = (e) => {
    e.target.value = "";
  };

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(messageToSend);
    if (messageToSend != null) {
      const url = "message/send";
      messageToSend.sent_to = chatData.id;
      const saveData = async () => {
        try {
          const responseData = await postData(messageToSend, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          fetchChatData(chatData.id);
          fetchProfilesData();
          setMessageToSend(null);
          scrollToBottom();
          document.querySelector("#message").value = "";
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
  };

  return (
    <MDBox pt={2} pb={3}>
      <Card>
        <MDBox
          m={3}
          sx={{
            minHeight: "73vh",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <MDBox
                sx={{
                  minHeight: "100%",
                  maxHeight: "100%",
                  display: "flex", // Use flexbox to arrange items
                  flexDirection: "column", // Arrange items vertically
                  justifyContent: "space-between", // Distribute space between items
                  border: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                  padding: "12px", // Add padding for content inside MDBox
                  borderRadius: "10px", // Add border radius for rounded corners
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
                }}
              >
                <MDBox>
                  <MDBox pt={0} px={2}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      Chats
                    </MDTypography>
                  </MDBox>
                  <Divider />
                  <ScrollableBox
                    sx={{
                      minHeight: "50vh",
                      maxHeight: "50vh",
                      overflowY: "auto", // Enable vertical scrolling when content overflows
                      WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
                    }}
                  >
                    {isProfileLoading ? (
                      <div />
                    ) : (
                      <ProfilesList
                        profiles={profilesData}
                        shadow={false}
                        setSelectedChat={setPatnerId}
                      />
                    )}
                  </ScrollableBox>
                  {isUsersLoading ? (
                    <div />
                  ) : (
                    <SearchableSelect
                      id="searchable"
                      title="Star New Chat"
                      options={usersData}
                      name="user_id"
                      setValue={setSelectedVal}
                      val={selectedVal}
                    />
                  )}
                </MDBox>
              </MDBox>
            </Grid>
            {isChatLoading ? (
              <Grid item xs={12} md={8}>
                <MDBox
                  sx={{
                    minHeight: "100%",
                    maxHeight: "100%",
                    border: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                    padding: "12px", // Add padding for content inside MDBox
                    borderRadius: "10px", // Add border radius for rounded corners
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
                  }}
                ></MDBox>
              </Grid>
            ) : (
              <Grid item xs={12} md={8}>
                <MDBox
                  sx={{
                    minHeight: "100%",
                    maxHeight: "100%",
                    border: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                    padding: "12px", // Add padding for content inside MDBox
                    borderRadius: "10px", // Add border radius for rounded corners
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
                  }}
                >
                  <MDBox display="flex" alignItems="center" mb={-1} mt={-0.5}>
                    <MDBox mr={2}>
                      <MDAvatar src={chatData.photo} alt={chatData.name} shadow="md" size="sm" />
                    </MDBox>
                    <MDTypography variant="button" fontWeight="medium">
                      {chatData.name}
                    </MDTypography>
                  </MDBox>
                  <Divider />
                  <ScrollableBox
                    ref={scrollRef}
                    sx={{
                      minHeight: "50vh",
                      maxHeight: "50vh",
                      overflowY: "auto", // Enable vertical scrolling when content overflows
                      WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
                    }}
                  >
                    <MessagesList
                      patnerId={chatData.id}
                      messages={chatData.messages}
                      shadow={false}
                    />
                  </ScrollableBox>
                  <form onSubmit={sendMessage}>
                    <MDBox display="flex" justifyContent="space-between">
                      <MDBox>
                        <MDHidenFileInput onFileChange={messageFileUpload} />
                      </MDBox>
                      <MDBox sx={{ minWidth: { xs: "70%", md: "80%", xl: "85%" } }}>
                        <MDInput
                          id="message"
                          onBlur={messageInputBlur}
                          type="text"
                          name="text"
                          onChange={messageInputChange}
                          fullWidth
                        />
                      </MDBox>
                      <MDBox>
                        <MDButton variant="gradient" color="info" iconOnly type="submit">
                          <Icon>send</Icon>
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </form>
                </MDBox>
              </Grid>
            )}
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default Messages;
