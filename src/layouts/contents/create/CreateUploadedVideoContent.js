// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { MenuItem } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDSelect from "components/MDSelect";

function CreateVideoContent() {
  return (
    <Grid container spacing={3} pt={3}>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput type="file" name="videoFile" label="Video" fullWidth />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <MDBox my={1}>
          <MDInput type="text" name="caption" label="Caption" fullWidth />
        </MDBox>
      </Grid>
      <input type="hidden" name="type" value="video" />
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
