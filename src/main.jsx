import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faEye,
  faEyeSlash,
  faPhone,
  faTimes,
  faCircleArrowLeft,
  faBowlFood,
  faPerson,
  faPersonBooth,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "./app/store";
import { Provider } from "react-redux";

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faEye,
  faEyeSlash,
  faPhone,
  faTimes,
  faCircleArrowLeft,
  faBowlFood,
  faUser
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
