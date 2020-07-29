import { DOCUMENT_MANAGEMENT, DOCUMENT_TRANSLATION, LOGIN } from "./link";
import { fromEntries } from "../utility/object";

const pageStructure = [[LOGIN], [DOCUMENT_MANAGEMENT], [DOCUMENT_TRANSLATION]];

module.exports.pages = fromEntries(pageStructure);
module.exports.routes = pageStructure.map(([path, _, initAction]) => {
  return [path, initAction];
});
