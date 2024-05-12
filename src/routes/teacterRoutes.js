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
import Dashboard from "layouts/dashboard";
import Messages from "layouts/messages";
import Courses from "layouts/courses";
import Modules from "layouts/modules";
import CreateCourse from "layouts/courses/create";
import CreateModule from "layouts/modules/create";
import CreateContent from "layouts/contents/create";
import CreateQuestion from "layouts/contents/create/CreateQuestion";
import ViewCourse from "layouts/courses/view";
import ViewModule from "layouts/modules/view";
import ViewVideoContent from "layouts/contents/view/video";
import ViewImageContent from "layouts/contents/view/image";
import ViewTextContent from "layouts/contents/view/text";
import ViewQuizContent from "layouts/contents/view/quiz";
import ViewQuestion from "layouts/contents/view/question";
import EditDocumentContent from "layouts/contents/edit/document";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import LiveStream from "layouts/pages/live-stream";
import Discussion from "layouts/pages/discussion";

// front side view
import Study from "layouts/pages/study";
import Quiz from "layouts/pages/quiz";
// @mui icons
import Icon from "@mui/material/Icon";

// TEACHER ROUTES
const teacherRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    icon: <Icon fontSize="small">auto_stories</Icon>,
    route: "/courses",
    collapse: [
      {
        key: "courses",
        route: "/courses",
        component: <Courses />,
      },
      {
        key: "create_course",
        route: "/courses/create",
        component: <CreateCourse />,
      },
      {
        key: "view_course",
        route: "/courses/course",
        component: <ViewCourse />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Modules",
    key: "modules",
    icon: <Icon fontSize="small">style</Icon>,
    route: "/modules",
    collapse: [
      {
        key: "modules",
        route: "/modules",
        component: <Modules />,
      },
      {
        key: "create_module",
        route: "/modules/create",
        component: <CreateModule />,
      },
      {
        key: "view_module",
        route: "/modules/module",
        component: <ViewModule />,
      },
    ],
  },
  {
    collapse: [
      {
        key: "create_content",
        route: "/create-content",
        component: <CreateContent />,
      },
      {
        key: "create_question",
        route: "/create-question",
        component: <CreateQuestion />,
      },
      {
        route: "/video-content",
        component: <ViewVideoContent />,
      },
      {
        route: "/image-content",
        component: <ViewImageContent />,
      },
      {
        route: "/text-content",
        component: <ViewTextContent />,
      },
      {
        route: "/quize-content",
        component: <ViewQuizContent />,
      },
      {
        route: "/question",
        component: <ViewQuestion />,
      },
      {
        route: "/edit-document",
        component: <EditDocumentContent />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Messages",
    key: "messages",
    icon: <Icon fontSize="small">email</Icon>,
    route: "/messages",
    component: <Messages />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
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
    route: "/room/:roomId",
    component: <LiveStream />,
  },
  {
    route: "/discussion/:id",
    component: <Discussion />,
  },
];

export default teacherRoutes;
