import { h, app, text } from "hyperapp";
import "../../assets/nav_bar.css";

module.exports.NavigationBar = (state, child) =>
  h(
    "div",
    { class: "dashboard-header" },
    h("div", { class: "navbar" }, [
      h("a", { class: "navbar-brand", href: "/" }, text("Orchard Of Thomas")),
      ...child,
    ])
  );
