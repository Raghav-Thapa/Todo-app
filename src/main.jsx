import ReactDOM from "react-dom/client";
import "./index.css";
import Routing from "./config/Routing.jsx";
import "./pages/sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import React, { useEffect } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
