// // @mui material components
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Kit 2 React components
// import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";
// import MKButton from "components/MKButton";

// // Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import Footer from "layouts/authentication/components/Footer";

// // Images
// import bgImage from "assets/front/images/bg-about-us.jpg";
// import { useState, useEffect } from "react";
// import { fetchObjects } from "api.js";

// import ListCourses from "pages/Courses/section/Courses";

// function Courses() {
//   const [data, setData] = useState();
//   const [isLoading, setIsLoading] = useState(true);

//   // fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedData = await fetchObjects("courses", "");
//         setData(fetchedData.courses);
//         setIsLoading(false);
//         console.log(data);
//       } catch (error) {
//         console.error("Failed to fetch objects:", error);
//         // Set error state for displaying error message to users
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <DefaultNavbar />
//       <MKBox
//         minHeight="35vh"
//         width="100%"
//         sx={{
//           backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
//             `${linearGradient(
//               rgba(gradients.dark.main, 0.6),
//               rgba(gradients.dark.state, 0.6)
//             )}, url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "top",
//           display: "grid",
//           placeItems: "center",
//         }}
//       ></MKBox>
//       <Card
//         sx={{
//           p: 2,
//           mx: { xs: 2, lg: 3 },
//           mt: -15,
//           mb: 4,
//           boxShadow: ({ boxShadows: { xxl } }) => xxl,
//         }}
//       >
//         {isLoading ? (
//           <div>
//             <p>Loading...</p>
//           </div>
//         ) : (
//           <ListCourses data={data} />
//         )}
//       </Card>
//       <MKBox pt={6} px={1} mt={6}>
//         <Footer />
//       </MKBox>
//     </>
//   );
// }

// export default Courses;

import React, { useState } from "react";
import { Box, Grid, Paper, Button } from "@mui/material";

import ScrollableBox from "pages/Study/sections/ScrollableBox";

function CourseInterface() {
  // Sample course modules data
  const [modules, setModules] = useState(
    Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Module ${index + 1}`,
      content: `Content for Module ${index + 1}`,
    }))
  );

  // State to track selected module
  const [selectedModule, setSelectedModule] = useState(null);
  // State to track full screen mode
  const [fullScreenMode, setFullScreenMode] = useState(false);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
  };

  const toggleFullScreenMode = () => {
    setFullScreenMode(!fullScreenMode);
  };

  return (
    <Box sx={{ display: "flex", overflow: fullScreenMode ? "hidden" : "auto" }}>
      {/* Left Side - Module List */}
      <ScrollableBox sx={{ flex: "0 0 30%", padding: "1rem" }}>
        {modules.map((module) => (
          <Paper
            key={module.id}
            onClick={() => handleModuleClick(module)}
            sx={{ cursor: "pointer", marginBottom: "1rem", padding: "1rem" }}
          >
            {module.title}
          </Paper>
        ))}
      </ScrollableBox>

      {/* Right Side - Module Content */}
      <Box sx={{ flex: "1", padding: "1rem" }}>
        {selectedModule ? (
          <Box>
            <Button onClick={toggleFullScreenMode} variant="outlined" sx={{ marginBottom: "1rem" }}>
              {fullScreenMode ? "Exit Full Screen" : "Full Screen"}
            </Button>
            {fullScreenMode ? (
              <Paper elevation={3} sx={{ padding: "1rem", minHeight: "100vh" }}>
                <h2>{selectedModule.title}</h2>
                <p>{selectedModule.content}</p>
              </Paper>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "70vh",
                  overflow: "hidden",
                }}
              >
                <h2>{selectedModule.title}</h2>
                <p>{selectedModule.content}</p>
              </Paper>
            )}
          </Box>
        ) : (
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "70vh",
              overflow: "hidden",
            }}
          >
            Select a module to view its content
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default CourseInterface;
