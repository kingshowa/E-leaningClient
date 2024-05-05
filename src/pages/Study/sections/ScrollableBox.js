import { styled } from "@mui/material/styles";
import MDBox from "components/MDBox";

// Styled Box component to customize scrollbar appearance
const ScrollableBox = styled(MDBox)({
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0px",
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    display: "none",
  },
});

export default ScrollableBox;
