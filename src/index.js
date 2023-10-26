import React from "react";
import ReactDOM from "react-dom/client";
// setup bootstrap files
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// setup fontawesome files
import "@fortawesome/fontawesome-free/css/all.min.css";
// main css project file
import "./index.css";
import App from "./App.js";
import ResumeContextProvider from "./Context/ResumeContext.js";
import DataContextProvider from "./Context/firebaseDataContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataContextProvider>
    <ResumeContextProvider>
      <App />
    </ResumeContextProvider>
  </DataContextProvider>
);
