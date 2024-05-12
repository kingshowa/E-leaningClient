// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import PostMenu from "./PostMenu";

function PostsList({ posts, shadow, setSelectedPost, userId }) {
  const clickedProfile = (id) => {
    setSelectedPost(id);
  };
  const renderProfiles = posts.map(({ id, topic, user }) => (
    <MDBox key={id} component="li" py={1} mb={1}>
      <MDBox display="flex" alignItems="center" sx={{ width: "100%" }}>
        <MDBox mr={2} component={Link} onClick={() => clickedProfile(id)}>
          <MDAvatar bgColor="dark" src={user.photo1} alt="something here" shadow="md" size="sm" />
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="top" minWidth="85%">
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            component={Link}
            onClick={() => clickedProfile(id)}
          >
            <MDTypography variant="button" fontWeight="medium">
              {topic}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {user.name}
            </MDTypography>
          </MDBox>
          <MDBox>{userId == user.id && <PostMenu psId={id} />}</MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox p={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{
            listStyleType: "none",
          }}
        >
          {renderProfiles}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the PostsList
PostsList.defaultProps = {
  shadow: true,
};

// Typechecking props for the PostsList
PostsList.propTypes = {
  setSelectedPost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
  userId: PropTypes.number,
};

export default PostsList;
