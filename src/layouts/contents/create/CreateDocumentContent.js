// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

function CreateContent() {
  return (
    <Grid container spacing={3} pt={3}>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput type="file" name="document" label="Document" fullWidth />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput type="text" name="caption" label="Caption" fullWidth />
        </MDBox>
      </Grid>
      <input type="hidden" name="type" value="document" />
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

export default CreateContent;
