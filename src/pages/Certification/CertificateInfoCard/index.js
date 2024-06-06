// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import QRCode from "qrcode";
import React, { useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { PDFDownloadLink } from "@react-pdf/renderer";
import CertificateContent from "../CertificateContent";
import bgImage1 from "assets/front/images/10339629.jpg";

function ProjectInfoCard({ image, title, description, info, shadow, data }) {
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const generateQrCodeDataUrl = async (value) => {
    try {
      return await QRCode.toDataURL(value);
    } catch (err) {
      console.error(err);
      return "";
    }
  };

  useEffect(() => {
    const generateQrCode = async () => {
      const qrCodeUrl = await generateQrCodeDataUrl(
        "http://localhost:3000/certificate/verify/" + data.token
      );
      setQrCodeDataUrl(qrCodeUrl);
    };
    generateQrCode();
  }, []);
  console.log(qrCodeDataUrl);
  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <MDBox position="relative" width="93%" shadow="sm" borderRadius="sm" mx={2}>
            <CardMedia
              src={bgImage1}
              component="img"
              title={title}
              sx={{
                maxWidth: "100%",
                margin: 0,
                boxShadow: ({ boxShadows: { md } }) => md,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <MDBox
              sx={{
                mt: { sx: -20, md: -30, xl: -40 },
                mb: { sx: 20, md: 20, xl: 20 },
                p: { xs: 2, md: 5, xl: 8 },
              }}
            >
              <MDTypography variant="h4" color="success">
                Certificate of Achievement
              </MDTypography>
              <MDTypography variant="body2" fontWeight="regular" color="success">
                This is to certify that {""}
                <strong>
                  {data.user.name} {data.user.surname}
                </strong>
                {""} has completed the course on <strong>{data.course.name}</strong>.
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <MDBox pl={2}>
            <MDBox>{renderItems}</MDBox>
            <MDBox mt={6}>
              <PDFDownloadLink
                document={<CertificateContent data={data} qrCodeDataUrl={qrCodeDataUrl} />}
                fileName="certificate.pdf"
              >
                {({ loading }) =>
                  loading ? (
                    "Loading document..."
                  ) : (
                    <MDButton color="red">
                      <Icon sx={{ fontWeight: "bold" }}>download</Icon>
                      &nbsp;&nbsp;Download Certificate
                    </MDButton>
                  )
                }
              </PDFDownloadLink>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Setting default props for the ProjectInfoCard
ProjectInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProjectInfoCard
ProjectInfoCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.object.isRequired,
  shadow: PropTypes.bool,
};

export default ProjectInfoCard;
