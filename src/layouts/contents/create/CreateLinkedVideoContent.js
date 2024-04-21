// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

function CreateVideoContent() {
  return (
    <Grid container spacing={3} pt={3}>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput type="text" name="link" label="URL" fullWidth />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput type="text" name="caption" label="Caption" fullWidth />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput type="number" name="start" label="Start" fullWidth />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput type="number" name="end" label="End" fullWidth />
          <input type="hidden" name="type" value="video" />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDButton variant="gradient" color="dark" type="submit">
            save content
          </MDButton>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default CreateVideoContent;
