import { SUBSCRIBE, HOMEPAGE, NOTES } from "./link";
import { fromEntries } from "../utility/object";
import { SubscribeView } from "../view/subscribe_view";
import { NotesView } from "../view/notes_view";

const pageStructure = [
  [SUBSCRIBE, SubscribeView.SubscribePage, SubscribeView.SubscribePageInit],
  [HOMEPAGE, NotesView.NotesPage, NotesView.NotesInit],
  [NOTES, NotesView.NotesPage, NotesView.NotesInit],
];

module.exports.pages = fromEntries(pageStructure);
module.exports.routes = pageStructure.map(([path, _, initAction]) => {
  return [path, initAction];
});
