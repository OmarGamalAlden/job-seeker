import React from "react";
import ReactDOM from "react-dom/client";
// setup config file
// import { fileURLToPath } from "url";
// import path from "path";
// import * as dotenv from "dotenv";
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

// const _dirname = path.dirname(fileURLToPath(import.meta.url));
// dotenv.config({ path: path.join(_dirname, "./config/.env") });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataContextProvider>
    <ResumeContextProvider>
      <App />
    </ResumeContextProvider>
  </DataContextProvider>
);
