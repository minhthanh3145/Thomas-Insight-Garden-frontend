import page from "page";
import { NoteController } from "../core/NoteController";
import { fromEntries } from "../utility/object";

const router = (dispatch, { routes }) => {
  // Route to normal pages
  const normalizedRoutes = normalize(routes);
  const paths = Object.keys(normalizedRoutes);
  paths.forEach((path) => {
    const route = normalizedRoutes[path];
    page(path, (context) => {
      dispatch(route, context.params);
    });
  });
  page.start();

  return () => {
    page.stop();
  };
};

const normalize = (routes) =>
  fromEntries(routes.map(([path, pageAction]) => [path, pageAction(path)]));

export const RoutePages = ({ routes, lazy }) => [router, { routes, lazy }];
