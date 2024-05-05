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
import QuizeView from "pages/Study/contents/quiz";
import DocumentView from "pages/Study/contents/document";

function ContentDisplay({ contents, p_index }) {
  return (
    <ScrollableBox sx={{ flex: "0 0 100%", px: 2, mt: -1, maxHeight: "100vh" }}>
      <Card>
        {contents.map((content, index) => (
          <MKBox key={content.id}>
            {content.type === "image" && (
              <ImageView data={content} index={p_index + "." + String(index + 1)} />
            )}
            {content.type === "video" && (
              <VideoView data={content} index={p_index + "." + String(index + 1)} />
            )}
            {content.type === "text" && (
              <TextView data={content} index={p_index + "." + String(index + 1)} />
            )}
            {content.type === "quize" && (
              <QuizeView data={content} index={p_index + "." + String(index + 1)} />
            )}
            {content.type === "document" && (
              <DocumentView data={content} index={p_index + "." + String(index + 1)} />
            )}
          </MKBox>
        ))}
      </Card>
    </ScrollableBox>
  );
}

ContentDisplay.propTypes = {
  contents: PropTypes.array.isRequired,
  p_index: PropTypes.array,
};

export default ContentDisplay;
