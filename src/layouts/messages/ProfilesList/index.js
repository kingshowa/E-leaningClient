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
import ProfilesMenu from "./ProfilesMenu";

function ProfilesList({ profiles, shadow, setSelectedChat }) {
  const clickedProfile = (id) => {
    setSelectedChat(id);
  };

  // sorting the data based on the last message received id
  profiles.sort((a, b) => b.lastMessage.id - a.lastMessage.id);
  //console.log(sortedChats);
  const renderProfiles = profiles.map(({ id, photo, name, lastMessage }) => (
    <MDBox key={name} component="li" py={1} mb={1}>
      <MDBox display="flex" alignItems="center">
        <MDBox mr={2} component={Link} onClick={() => clickedProfile(id)}>
          <MDAvatar bgColor="dark" src={photo} alt="something here" shadow="md" size="sm" />
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="top" minWidth="85%">
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            component={Link}
            onClick={() => clickedProfile(id)}
            sx={{ flexGrow: 10 }}
          >
            <MDTypography variant="button" fontWeight="medium">
              {name}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {lastMessage.text}
            </MDTypography>
          </MDBox>
          <MDBox>
            <ProfilesMenu psId={id} />
          </MDBox>
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

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  setSelectedChat: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
