import React, { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CreateContent({ setData }) {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
    setData({ data: data });
  };

  useEffect(() => {
    if (editorContent) {
      //setData({ data: data });
    }
  }, [editorContent]);

  const editorStyle = {
    width: "100%", // Set the desired width
  };
  return (
    <Grid container spacing={3} pt={3}>
      <MDBox my={1} ml={3} mt={3} style={editorStyle}>
        <CKEditor editor={ClassicEditor} data={editorContent} onChange={handleEditorChange} />
      </MDBox>
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

CreateContent.propTypes = {
  setData: PropTypes.func,
};

export default CreateContent;
