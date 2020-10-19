import { h, text } from "hyperapp";
import "../assets/notes_view.css";
import MarkdownIt from "markdown-it";
import miw from "../utility/markdown-wiki-links";
import mk from "markdown-it-katex";
import { NoteController } from "../core/NoteController";

let md = new MarkdownIt();
md.use(miw({ uriSuffix: ".md", relativeBaseURL: "/notes/" }));
md.use(mk);

const Note = (note) =>
  h("div", { class: "card border-secondary note-card" }, [
    h("div", { class: "card-body" }, [
      h(
        "p",
        { class: "card-text" },
        h("div", {
          innerHTML: md.render(note.content),
          onclick: [NoteController.SearchForBackLink, note.title],
        })
      ),
    ]),
  ]);

const CardsView = (state) =>
  h("div", { class: "cards-view" }, [
    h("div", { class: "container-fluid" }, [
      h(
        "div",
        { class: "row" },
        state.notes.map((note) => Note(note))
      ),
    ]),
  ]);

const SearchInput = (state) =>
  h(
    "div",
    { class: "search-input-container" },
    h("input", {
      type: "text",
      class: "form-control",
      placeholder: "Search note",
      oninput: (state, e) =>
        NoteController.SearchForNote(state, e.target.value),
    })
  );

const SideBar = (state) =>
  h("div", { class: "side-bar" }, [
    SearchInput(state),
    SearchResult(state),
    BackLink(state),
  ]);

const SearchResult = (state) =>
  h(
    "div",
    { class: "search-result" },
    state.searchResults.map((res) =>
      h("a", { class: "search-result-item", href: `/notes/${res}` }, text(res))
    )
  );
const BackLink = (state) =>
  h(
    "div",
    {
      class: "backlink",
    },
    [
      ...state.backLinks.map((link) =>
        h("a", { class: "backlink-item", href: `/notes/${link}` }, text(link))
      ),
    ]
  );

const Notes = (state) =>
  h(
    "div",
    { class: "container-fluid" },
    h("div", { class: "row" }, [
      h(
        "div",
        { class: "col" },
        h("div", { class: "notes-view-container" }, CardsView(state))
      ),
      h("div", { class: "col-md-3" }, SideBar(state)),
    ])
  );

const notesPage = (state) =>
  h("div", { class: "body-container" }, [Notes(state)]);

const notesInit = (page) => (state, { noteTitle: noteTitle }) => {
  console.log(noteTitle);
  if (!noteTitle) {
    noteTitle = "/notes/Orchard of Thomas.md";
  }
  console.log(noteTitle);
  return (state) => [
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
  ];
};

module.exports.NotesView = {
  NotesInit: notesInit,
  NotesPage: notesPage,
};
