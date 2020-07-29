import page from "page";
import { NoteController } from "../core/NoteController";

const router = (dispatch) => {
  page("/*", (context) => {
    let noteTitle = context.path;
    dispatch((state) => [
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
    ]);
  });
  page.start();

  return () => {
    page.stop();
  };
};

module.exports.RoutePages = () => [router, {}];
