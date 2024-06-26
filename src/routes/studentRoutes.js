/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Profile from "layouts/pages/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Home from "layouts/pages/home";
import Courses from "layouts/pages/courses";
import Course from "layouts/pages/course";
import Programs from "layouts/pages/programs";
import Program from "layouts/pages/program";
import Learning from "layouts/pages/learning";
import Study from "layouts/pages/study";
import Quiz from "layouts/pages/quiz";
import Messages from "layouts/pages/messages";
import Certificate from "layouts/pages/certificate";
import Verify from "layouts/pages/certificate-verify";
import Discussion from "layouts/pages/discussion";
import LiveStream from "layouts/pages/live-stream";
import Payment from "layouts/pages/payment";
import AboutUs from "layouts/pages/landing-pages/about-us";
import Presentation from "layouts/pages/presentation";
import Author from "pages/LandingPages/Author";

// @mui icons
import Icon from "@mui/material/Icon";

// STUDENTS ROUTES //
const studentRoutes = [
  {
    route: "/messages",
    component: <Messages />,
  },
  {
    route: "/certificate/:name/:id",
    component: <Certificate />,
  },
  {
    route: "/certificate/verify/:id",
    component: <Verify />,
  },
  {
    route: "/discussion/:id",
    component: <Discussion />,
  },
  {
    route: "/room/:roomId",
    component: <LiveStream />,
  },
  {
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    route: "/home",
    component: <Home />,
  },
  {
    route: "/courses",
    component: <Courses />,
  },
  {
    route: "/course/:id",
    component: <Course />,
  },
  {
    route: "/programs",
    component: <Programs />,
  },
  {
    route: "/program/:id",
    component: <Program />,
  },
  {
    route: "/register/:name/:id",
    component: <Payment />,
  },
  {
    route: "/learning",
    component: <Learning />,
  },
  {
    route: "/course/study/:id",
    component: <Study />,
  },
  {
    route: "/excercise/:id/:courseId",
    component: <Quiz />,
  },
  {
    route: "/about-us",
    component: <AboutUs />,
  },
  {
    route: "/presentation",
    component: <Presentation />,
  },
  {
    route: "/author",
    component: <Author />,
  },
];

export default studentRoutes;
