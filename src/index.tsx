import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { DAppProvider, ChainId } from "@usedapp/core";

ReactDOM.render(
  <React.StrictMode>
    {/* <DAppProvider
      config={{
        supportedChains: [ChainId.Mainnet, ChainId.Ropsten],
      }}
    > */}
    <Router>
      <App />
    </Router>
    {/* </DAppProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
