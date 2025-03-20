import { render } from "solid-js/web";
import { lazy } from "solid-js";

import "./app.css";
import "@fontsource/inter";

const SystemRouting = lazy(() => import("./router"));

const root = document.getElementById("root");

if (!root) {
  throw new Error("Error initializing application");
} else {
  render(() => <SystemRouting />, root);
}
