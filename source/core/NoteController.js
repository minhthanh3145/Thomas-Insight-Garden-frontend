import { ApiProvider } from "../api/ApiProvider";

const getNote = (props) => [
  (dispatch, props) => {
    let noteTitle = props.noteTitle;
    ApiProvider.GetNote(noteTitle)
      .then((note) => {
        dispatch(props.action, note);
      })
      .catch((err) => {
        dispatch(props.error);
      });
  },
  props,
];

const scrollToBottom = (props) => [
  (dispatch, props) => {
    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight);
    }, 300);
    dispatch(props.action);
  },
  props,
];

const addNote = (notes, note) => {
  notes.push(note);
  return notes;
};

let doIt;
const SearchForNoteEffect = (props) => [
  (dispatch, props) => {
    console.log(props.searchTerm);
    if (doIt) {
      clearTimeout(doIt);
    }
    doIt = setTimeout(function () {
      ApiProvider.SearchForNote(props.searchTerm).then((result) => {
        dispatch(props.action, result);
      });
    }, 500);
  },
  props,
];

const searchForNote = (state, value) => [
  {
    ...state,
    searchTerm: value,
  },
  SearchForNoteEffect({
    searchTerm: value,
    action: (state, res) => ({ ...state, searchResults: res }),
  }),
];

const searchForBackLink = (state, value) => [
  {
    ...state,
    searchTerm: value,
  },
  SearchForNoteEffect({
    searchTerm: value,
    action: (state, res) => ({ ...state, backLinks: res }),
  }),
];

module.exports.NoteController = {
  GetNote: getNote,
  AddNote: addNote,
  ScrollToBottom: scrollToBottom,
  SearchForNote: searchForNote,
  SearchForBackLink: searchForBackLink,
};
