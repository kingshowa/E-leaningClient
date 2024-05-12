import React, { useState, useEffect, useRef } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import ScrollableBox from "pages/Study/sections/ScrollableBox";
import Footer from "layouts/authentication/components/Footer";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDHidenFileInput from "components/MDHidenFileInput";
import MDAvatar from "components/MDAvatar";

import { useParams } from "react-router-dom";

import { fetchObjects, postData } from "api.js";
import { useAuth } from "context/authContext";
import CourseNavBar from "pages/Study/sections/CourseNavBar.js";

import PostsList from "./PostsList";
import MessagesList from "./MessagesList";

function Discussion() {
  const { id } = useParams();
  const { token } = useAuth();

  const [data, setData] = useState(); // to store the post to be created
  const [chatData, setChatData] = useState();
  const [postsListData, setPostsListData] = useState();

  const [postId, setPostId] = useState();
  const [userId, setUserId] = useState();

  const [isPostsListLoading, setIsPostsListLoading] = useState(true);
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
    fetchPostsListData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchPostsListData();
    }, 5000); // Interval in milliseconds (5 seconds)

    // Clean up the interval to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (postId) {
      fetchChatData(postId);
      setIsChatLoading(true);
      scrollToBottom();
    }
    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      if (postId) {
        fetchChatData(postId);
      }
    }, 5000); // Interval in milliseconds (5 seconds)

    // Clean up the interval to prevent memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, [postId]);

  // fetch data
  useEffect(() => {
    if (!isChatLoading) scrollToBottom();
  }, [isChatLoading]);

  // fetch a list of posts in a particular discussion (course)
  const fetchPostsListData = async () => {
    try {
      const data1 = await fetchObjects("discussion/" + id, token);
      setPostsListData(data1.discussion);
      setUserId(data1.user);
      // setPostId(data1.discussion.posts[0].id);
      setIsPostsListLoading(false);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  };

  // fetch post messages
  const fetchChatData = async (postId) => {
    try {
      const data = await fetchObjects("post/messages/" + postId, token);
      setChatData(data.post);
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

  const postInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  const messageFileUpload = (file) => {
    setMessageToSend({ ...messageToSend, ["attachment"]: file });
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
      messageToSend.post_id = chatData.id;
      const saveData = async () => {
        try {
          const responseData = await postData(messageToSend, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          fetchChatData(chatData.id);
          fetchPostsListData();
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

  // create a new post
  const createPost = (event) => {
    event.preventDefault();
    console.log(data);
    if (data) {
      const url = "discussion/post/" + id;
      const saveData = async () => {
        try {
          const responseData = await postData(data, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          setPostId(responseData.post_id);
          fetchPostsListData();
          setData(null);
          fetchPostData(postId);
          document.querySelector("#post").value = "";
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
  };

  return (
    <>
      <CourseNavBar courseId={id} courseName={"Course Name Here"} />
      <MKBox sx={{ mx: { xs: 0, md: "5%" }, pt: 2 }}>
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
                      <MDBox px={2} mb={-0.5}>
                        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                          Posts
                        </MDTypography>
                      </MDBox>
                      <Divider />
                      <ScrollableBox
                        sx={{
                          minHeight: "55vh",
                          maxHeight: "55vh",
                          overflowY: "auto", // Enable vertical scrolling when content overflows
                          WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
                        }}
                      >
                        {isPostsListLoading ? (
                          <div />
                        ) : (
                          <PostsList
                            posts={postsListData.posts}
                            shadow={false}
                            setSelectedPost={setPostId}
                            userId={userId}
                          />
                        )}
                      </ScrollableBox>
                      <form onSubmit={createPost}>
                        <MDBox display="flex" justifyContent="space-between">
                          <MDBox sx={{ minWidth: { xs: "70%", md: "80%", xl: "85%" } }}>
                            <MDInput
                              id="post"
                              onBlur={messageInputBlur}
                              type="text"
                              placeholder="Create New Post"
                              name="topic"
                              onChange={postInputChange}
                              fullWidth
                            />
                          </MDBox>
                          <MDBox>
                            <MDButton variant="gradient" color="info" iconOnly type="submit">
                              <Icon>add</Icon>
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </form>
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
                      <MDBox display="flex" alignItems="center">
                        <MDTypography variant="button" fontWeight="medium" ml={2}>
                          {chatData.topic}
                        </MDTypography>
                      </MDBox>
                      <Divider />
                      <ScrollableBox
                        ref={scrollRef}
                        sx={{
                          minHeight: "55vh",
                          maxHeight: "55vh",
                          overflowY: "auto", // Enable vertical scrolling when content overflows
                          WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS devices
                        }}
                      >
                        <MessagesList userId={userId} messages={chatData.messages} shadow={false} />
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
      </MKBox>
      <MKBox px={1} mt={3}>
        <Footer />
      </MKBox>
    </>
  );
}

export default Discussion;
