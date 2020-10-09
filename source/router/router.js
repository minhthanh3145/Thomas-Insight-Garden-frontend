import page from "page";
import { NoteController } from "../core/NoteController";
import { fromEntries } from "../utility/object";

const router = (dispatch, { routes }) => {
  // Default note
  page("/", (context) => {
    console.log(context.params);
    page.redirect("/notes/Areas of Focus.md");
  });

  // Route to normal pages
  const normalizedRoutes = normalize(routes);
  const paths = Object.keys(normalizedRoutes);
  paths.forEach((path) => {
    const route = normalizedRoutes[path];
    page(path, (context) => {
      dispatch(route, context.params);
    });
  });
  // Route to a special action that adds a note
  page("/notes/*", (context) => {
    let noteTitle = context.path;
    dispatch(
      (state) => [
        state,
        NoteController.GetNote({
          noteTitle: noteTitle,
          action: (state, note) =>
            note
              ? [
                  {
                    ...state,
                    error: false,
                    message: "Welcome to my notes",
                    notes: NoteController.AddNote(state.notes, {
                      title: note.title,
                      content: note.content,
                    }),
                  },
                  NoteController.ScrollToBottom({
                    action: (state) => state,
                  }),
                ]
              : state,
          error: (state) => ({
            ...state,
            error: true,
            message: "This note is not public !",
          }),
        }),
      ],
      context.params
    );
  });
  page.start();

  return () => {
    page.stop();
  };
};

const normalize = (routes) =>
  fromEntries(routes.map(([path, pageAction]) => [path, pageAction(path)]));

export const RoutePages = ({ routes, lazy }) => [router, { routes, lazy }];
