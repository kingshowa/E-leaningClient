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

// Images
import bgImage from "assets/front/images/bg-about-us.jpg";
import bgImage1 from "assets/front/images/10339629.jpg";

import { PDFDownloadLink } from "@react-pdf/renderer";
import CertificateContent from "./CertificateContent";
import CertificateInfoCard from "./CertificateInfoCard";

import { fetchObjects } from "api.js";
import { useAuth } from "context/authContext";
import { useParams } from "react-router-dom";

function Certificate() {
  const { token } = useAuth();
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // fetch certificate data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchObjects("certificate-verify/" + id);
        setData(fetchedData.certificate);
        setIsLoading(false);
        console.log(fetchedData.certificate);
      } catch (error) {
        console.error("Failed to fetch objects:", error);
        // Set error state for displaying error message to users
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <DefaultNavbar />
      <MKBox
        minHeight="45vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>
      <Card
        sx={{
          p: { xs: 2, md: 4 },
          mx: { xs: 2, lg: 10 },
          mt: -15,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <CertificateInfoCard
            image={data.photo}
            title={data.course.name}
            info={{
              completed_on: data.date,
              duration: data.course.duration + " Hours",
              modules: data.course.modules + " Modules",
            }}
            data={data}
            shadow={false}
          />
        )}
      </Card>
      <MKBox px={1}>
        <Footer />
      </MKBox>
    </>
  );
}

export default Certificate;
