import { SUBSCRIBE } from "./link";
import { fromEntries } from "../utility/object";
import { SubscribeView } from "../view/subscribe_view";

const pageStructure = [
  [SUBSCRIBE, SubscribeView.SubscribePage, SubscribeView.SubscribePageInit],
];

module.exports.pages = fromEntries(pageStructure);
module.exports.routes = pageStructure.map(([path, _, initAction]) => {
  return [path, initAction];
});
