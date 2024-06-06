import React from "react";

// Image
import bgImage1 from "assets/front/images/10339629.jpg";

import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    paddingTop: 15,
  },
  background: {
    width: "100%",
    height: "100%",
    zIndex: 0,
    position: "absolute",
  },
  content: {
    textAlign: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    position: "absolute",
    left: "0px",
    right: "0px",
    marginHorizontal: "auto",
    textAlign: "center",
    justifyContent: "center",
  },
  title1: {
    fontSize: 24,
    marginBottom: 20,
    position: "absolute",
    left: "0px",
    right: "0px",
    marginHorizontal: "100px",
    textAlign: "left",
    justifyContent: "left",
    color: "green",
  },
  text: {
    position: "absolute",
    left: "0px",
    right: "0px",
    marginHorizontal: "auto",
    textAlign: "center",
    justifyContent: "center",
  },
  qrCode: {
    width: 100,
    height: 100,
    zIndex: 10,
    position: "absolute",
  },
});
import PropTypes from "prop-types";

function CertificateContent({ data, qrCodeDataUrl }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.background}>
          <Image src={bgImage1}></Image>
        </View>
        <Text style={{ top: "100px", marginLeft: "100px", ...styles.title1 }}>ATM Learning</Text>
        <Text style={{ top: "150px", ...styles.title }}>Certificate of Achievement</Text>
        <Text style={{ top: "200px", ...styles.text }}>This is to certify that</Text>
        <Text style={{ top: "240px", ...styles.title }}>
          {data.user.name} {data.user.surname}
        </Text>
        <Text style={{ top: "280px", ...styles.text }}>has completed the course on</Text>
        <Text style={{ top: "320px", ...styles.title }}>{data.course.name}.</Text>
        <View style={{ top: 340, marginLeft: 100 }}>
          {qrCodeDataUrl ? (
            <Image src={qrCodeDataUrl} style={styles.qrCode} />
          ) : (
            <Text>Loading QR Code...</Text>
          )}
        </View>
      </Page>
    </Document>
  );
}

CertificateContent.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
    }).isRequired,
    course: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
  qrCodeDataUrl: PropTypes.any,
};
export default CertificateContent;
