import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/bootstrap-custom.scss"; // Importar solo los módulos necesarios de Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
