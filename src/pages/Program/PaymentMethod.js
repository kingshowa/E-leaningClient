import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { postData } from "api.js";
import { useAuth } from "context/authContext";

function PaymentForm() {
  let { id } = useParams();
  let { name } = useParams();

  const { token } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isSaved, setIsSaved] = useState(false);

  // Update data management
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  //console.log(id);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    if (data != null) {
      const url = name + "/register/" + id;
      const saveData = async () => {
        try {
          const responseData = await postData(data, url, token);
          console.log("Data saved successfully:", responseData);
          // Navigate to another page after successful data saving
          setIsSaved(true);
          console.log(responseData);
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };
      saveData();
    }
  };

  useEffect(() => {
    if (isSaved) {
      navigate("/learning");
    }
  }, [isSaved]);

  return (
    <div>
      <MDBox component="form" role="form" onSubmit={handleSubmit} p={2} pt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDTypography>Payment Details</MDTypography>
          </Grid>
          <Grid item xs={12}>
            <MDBox my={0}>
              <MDInput
                type="text"
                name="card_number"
                label="Card Number"
                fullWidth
                onChange={handleInputChange}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8}>
            <MDBox my={0}>
              <MDInput
                type="date"
                name="exp_date"
                label="Expiry Date"
                fullWidth
                onChange={handleInputChange}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <MDBox my={0}>
              <MDInput type="text" name="cvv" label="CVV" fullWidth onChange={handleInputChange} />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDBox my={0}>
              <MDInput
                type="text"
                name="name"
                label="Name on Card"
                fullWidth
                onChange={handleInputChange}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDBox my={0}>
              <MDButton variant="gradient" color="dark" type="submit">
                submit payment
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );
}

export default PaymentForm;
