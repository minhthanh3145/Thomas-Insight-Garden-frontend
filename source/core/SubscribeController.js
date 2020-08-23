import page from "page";

const goBackToNotes = (state) => [
  state,
  goBackToNotesEffect({
    action: (state) => ({ ...state, page: "/" }),
  }),
];

const goBackToNotesEffect = (props) => [
  (dispatch, props) => {
    page.redirect("/");
    dispatch(props.action);
  },
  props,
];

const subscribe = (state) => [
  state,
  subscribeEffect({
    action: (state) => ({ ...state, message: "You are subscribed !" }),
  }),
];

const subscribeEffect = (props) => [
  (dispatch, props) => {
    dispatch(props.action);
  },
  props,
];

module.exports.SubscribeController = {
  GoBackToNotes: goBackToNotes,
  Subscribe: subscribe,
};
