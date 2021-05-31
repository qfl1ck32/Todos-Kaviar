import { XUIProvider } from "@kaviar/x-ui";
import "reflect-metadata";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { kernel } from "./kernel";
import "./styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <XUIProvider kernel={kernel} />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
