// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Menu from "@mui/material/Menu";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDSwitch from "components/MDSwitch";

// Material Dashboard 2 React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import { useAuth } from "context/authContext";
import { postData } from "api.js";
import { Link, useNavigate } from "react-router-dom";

function DefaultNavbarMobile({ open, close }) {
  const { width } = open && open.getBoundingClientRect();
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    console.log("Loged out");
    const url = "auth/logout";
    const saveData = async () => {
      try {
        const responseData = await postData({}, url, token);
        console.log("Data saved successfully:", responseData);
        logout();
        // Navigate to another page after successful data saving
        navigate("/authentication/sign-in");
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };
    saveData();
  };
  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <MDBox px={0.5}>
        <DefaultNavbarLink icon="home" name="Home" route="/" />
        <DefaultNavbarLink icon="school" name="Programs" route="/programs" />
        <DefaultNavbarLink icon="local_library" name="Courses" route="/courses" />
        <DefaultNavbarLink icon="info" name="About Us" route="/about-us" />
        {token ? (
          <div>
            <DefaultNavbarLink icon="person" name="My Profile" route="/profile" />
            <DefaultNavbarLink icon="backpack" name="My Learning" route="/learning" />
            <DefaultNavbarLink icon="email" name="Messages" route="/messages" />
            <MDBox component={Link} onClick={() => logOut()}>
              <DefaultNavbarLink icon="logout" name="Log Out" />
            </MDBox>
          </div>
        ) : (
          <div>
            <DefaultNavbarLink icon="key" name="Sign In" route="/authentication/sign-in" />
            <DefaultNavbarLink icon="logout" name="Sign Out" route="/authentication/sign-up" />
          </div>
        )}
        <MDBox display="flex" justifyContent="space-around" alignItems="center">
          <MDSwitch />
        </MDBox>
      </MDBox>
    </Menu>
  );
}

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default DefaultNavbarMobile;
