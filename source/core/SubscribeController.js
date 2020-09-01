import page from "page";
import { ApiProvider } from "../api/ApiProvider";

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
    email: state.email,
    name: state.name,
    action: (state, msg) => ({ ...state, message: "You are subscribed !" }),
    error: (state, msg) => ({ ...state, message: msg })
  }),
];

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const subscribeEffect = (props) => [
  (dispatch, props) => {
    const email = props.email;
    const name = props.name;
    if (validateEmail(email)) {
      ApiProvider.AddContactToEmailList(email, name)
        .then(res => {
          console.log(res);
          dispatch(props.action, "You are subscribed !");
        }).catch(err => {
          dispatch(props.error, err.message);
        })
    } else {
      dispatch(props.error, "Email is invalid");
    }
  },
  props,
];

module.exports.SubscribeController = {
  GoBackToNotes: goBackToNotes,
  Subscribe: subscribe,
};
