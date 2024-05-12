import React, { useState, useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
//import DefaultNavbar from "examples/front/Navbars/DefaultNavbar";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Footer from "layouts/authentication/components/Footer";

import MessagesBody from "layouts/messages/MessagesBody";

// Images
import bgImage from "assets/front/images/bg-about-us.jpg";

function StdentMessages() {
  return (
    <>
      <DefaultNavbar />
      <MKBox
        minHeight="100vh"
        width="100%"
        pt={10}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <MKBox sx={{ mx: { xs: 0, md: "5%" }, pt: 2 }}>
          <MessagesBody />
        </MKBox>
        <MKBox px={1}>
          <Footer />
        </MKBox>
      </MKBox>
    </>
  );
}

export default StdentMessages;
