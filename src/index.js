import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//import { Amplify } from "aws-amplify";
//import awsconfig from "./aws-exports";
import { AppProvider } from "./context";
//import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//Amplify.configure(awsconfig);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);

reportWebVitals();
