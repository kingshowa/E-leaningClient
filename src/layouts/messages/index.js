import React from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MessagesBody from "layouts/messages/MessagesBody";

function Messages() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MessagesBody />
      <Footer />
    </DashboardLayout>
  );
}

export default Messages;
