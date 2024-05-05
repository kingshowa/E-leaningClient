// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MDTypography from "components/MDTypography";
import MKButton from "components/MKButton";

import React, { useState } from "react";
import PropTypes from "prop-types";

import { Icon, Paper } from "@mui/material";

import ScrollableBox from "pages/Study/sections/ScrollableBox";
import ImageView from "pages/Study/contents/image";
import VideoView from "pages/Study/contents/video";
import TextView from "pages/Study/contents/text";
// import QuizeView from "pages/Study/contents/quiz";

function ContentDisplay({ contents }) {
  return (
    <ScrollableBox sx={{ flex: "0 0 100%", px: 2, mt: -1, maxHeight: "100vh" }}>
      <Card>
        {contents.map((content) => (
          <MKBox key={content.id}>
            {content.type === "image" && <ImageView data={content} />}
            {content.type === "video" && <VideoView data={content} />}
            {content.type === "text" && <TextView data={content} />}
            {content.type === "quize" && "Quize"}
            {content.type === "document" && "Document"}
          </MKBox>
        ))}
      </Card>
    </ScrollableBox>
  );
}

ContentDisplay.propTypes = {
  contents: PropTypes.array.isRequired,
};

export default ContentDisplay;
