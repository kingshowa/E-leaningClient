import { useState, useEffect } from "react";

// react-router components
import { Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSwitch from "components/MDSwitch";
import MDAvatar from "components/MDAvatar";
import NotificationItem from "examples/Items/NotificationItem";

// Material Dashboard 2 React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

import { postData } from "api.js";
import { useAuth } from "context/authContext";

function DefaultNavbar({ transparent, light, action }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  const { token, logout } = useAuth();

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const [openMenu, setOpenMenu] = useState(false);
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
  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {token ? (
        <div>
          <Link to="/profile">
            <NotificationItem icon={<Icon>person</Icon>} title="My Profile" />
          </Link>
          <Link to="/learning">
            <NotificationItem icon={<Icon>backpack</Icon>} title="My Learning" />
          </Link>
          <Link to="/messages">
            <NotificationItem icon={<Icon>email</Icon>} title="Messages" />
          </Link>
          <NotificationItem icon={<Icon>logout</Icon>} title="Log Out" onClick={() => logOut()} />
        </div>
      ) : (
        <div>
          <Link to="/authentication/sign-in">
            <NotificationItem icon={<Icon>key</Icon>} title="Sign In" />
          </Link>
          <Link to="/authentication/sign-up">
            <NotificationItem icon={<Icon>person</Icon>} title="Sign Up" />
          </Link>
        </div>
      )}
    </Menu>
  );

  return (
    <Container>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MDBox
          component={Link}
          to="/"
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
          pl={{ xs: 0, lg: 1 }}
        >
          <MDTypography variant="button h2" fontWeight="bold" color={light ? "white" : "dark"}>
            MAJID
          </MDTypography>
          <MDTypography variant="button h2" fontWeight="light" color={light ? "white" : "dark"}>
            Learn
          </MDTypography>
        </MDBox>
        <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <DefaultNavbarLink icon="home" name="Home" route="/" light={light} />
          <DefaultNavbarLink icon="school" name="Programs" route="/programs" light={light} />
          <DefaultNavbarLink icon="local_library" name="Courses" route="/courses" light={light} />
          <DefaultNavbarLink icon="info" name="About Us" route="/about-us" light={light} />
          {token ? (
            <DefaultNavbarLink icon="backpack" name="My Learning" route="/learning" light={light} />
          ) : (
            <div />
          )}
        </MDBox>
        <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <MDBox display="flex" justifyContent="space-around" alignItems="center">
            <MDSwitch />
          </MDBox>
          <MDBox
            component={Link}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            pl={2}
            onClick={handleOpenMenu}
          >
            <MDAvatar bgColor="dark" src={""} alt="profile-image" size="sm" shadow="sm" />
          </MDBox>
          {renderMenu()}
        </MDBox>
        <MDBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </MDBox>
      </MDBox>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
