import { pages } from "../router/index";
import { NotesView } from "./notes_view";
import { h, text } from "hyperapp";
import { NavigationBar } from "./widgets/navigation_bar";
import "../assets/layout_view.css";

/** Unused */
const SubscribeToWeeklyEmail = (state) =>
  h("a", { href: "/subscribe" }, text("Subscribe to weekly email"));

const InformationPane = (state) =>
  h(
    "div",
    { class: "info-pane " + (state.error ? "error" : "") },
    text(state.message)
  );

const routeToNormalPages = (state) => {
  let page = state.page;
  let val = page && page !== "/" && !page.startsWith("/notes");
  return val;
};

module.exports.LayoutView = (state) =>
  h("div", { class: "body-container" }, [
    NavigationBar(state, [InformationPane(state)]),
    routeToNormalPages(state) ? pages[state.page](state) : NotesView(state),
  ]);
