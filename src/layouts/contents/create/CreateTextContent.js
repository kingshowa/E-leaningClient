import React, { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CreateContent() {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  };

  const editorStyle = {
    width: "100%", // Set the desired width
  };
  return (
    <Grid container spacing={3} pt={3}>
      <MDBox my={1} ml={3} mt={3} style={editorStyle}>
        <CKEditor editor={ClassicEditor} data={editorContent} onChange={handleEditorChange} />
      </MDBox>
      <input type="hidden" name="type" value="text" />
      <input type="hidden" name="data" value={editorContent} />
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
