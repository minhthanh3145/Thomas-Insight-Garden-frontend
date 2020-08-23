import { h, app } from "hyperapp";
import { LayoutView } from "./view/layout_view";
import { RoutePages } from "./router/router";
import { routes } from "./router/index";

const initState = {
  backLinks: [],
  searchResults: [],
  error: false,
  message: "Welcome to my notes",
  notes: [],
};

app({
  init: () => [initState, RoutePages({ routes })],
  view: LayoutView,
  node: document.getElementById("hyperapp"),
});
