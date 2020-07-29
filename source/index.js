import { h, app } from "hyperapp";
import { NotesView } from "./view/notes_view";
import { RoutePages } from "./router/router";

app({
  init: () => [
    {
      backLinks: [],
      searchResults: [],
      error: false,
      message: "Welcome to my notes",
      notes: [],
    },
    RoutePages({}),
  ],
  view: NotesView,
  node: document.getElementById("hyperapp"),
});
