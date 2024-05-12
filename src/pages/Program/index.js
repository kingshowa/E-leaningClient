import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
//import DefaultNavbar from "examples/front/Navbars/DefaultNavbar";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Footer from "layouts/authentication/components/Footer";

import ProgramInfoCard from "examples/Cards/InfoCards/ProgramInfoCard";
import { fetchObjects } from "api.js";

// Images
import bgImage from "assets/front/images/bg-about-us.jpg";

function Program() {
  let { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // fetch data
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data1 = await fetchObjects("program/" + id, "");
      setData(data1.program);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch objects:", error);
    }
  };

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
          p: 2,
          mx: { xs: 2, lg: 3 },
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
          <ProgramInfoCard
            image={data.photo}
            title={data.name}
            price={data.price}
            description={data.description}
            info={{
              creator: data.teacher.name,
              email: data.teacher.email,
              courses: data.courses,
            }}
            action={{
              name: "register",
              route: "/register/program/" + data.id,
              icon: "add",
            }}
            shadow={false}
          />
        )}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <Footer />
      </MKBox>
    </>
  );
}

export default Program;
