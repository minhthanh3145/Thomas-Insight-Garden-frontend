import { h, text } from "hyperapp";
import "../assets/subscribe_view.css";
import { SubscribeController } from "../core/SubscribeController";

const subscribePage = (state) =>
  h("div", { class: "subscribe-container", key: "subscribe-container" }, [
    h("p", {}, [
      text(
        "I compose and send an email to subscribers once every two week detailing my new thoughts. "
      ),
    ]),
    h("div", { class: "input-group mb-3" }, [
      h(
        "div",
        { class: "input-group-prepend" },
        h(
          "button",
          {
            class: "btn btn-outline-secondary",
            type: "button",
            "aria-describedby": "basic-addon1",

            onclick: (state) => SubscribeController.GoBackToNotes,
          },
          text("Back to the orchard")
        )
      ),
      h("input", {
        class: "form-control subscribe-input"
        , type: "text"
        , placeholder: "Name"
        , oninput: (state, event) => [({ ...state, name: event.target.value })]
      }),
      h("input", {
        class: "form-control subscribe-input"
        , type: "text"
        , placeholder: "Email"
        , oninput: (state, event) => [({ ...state, email: event.target.value })]
      }),
    ]),
    h(
      "button",
      {
        class: "btn btn-primary",

        onclick: (state) => SubscribeController.Subscribe,
      },
      text("Subscribe")
    ),
  ]);

const subscribePageInit = (page) => (state, { param }) => {
  // Do not remember the notes to avoid fetching the default note adds another note
  return { ...state, page, notes: [] };
};

module.exports.SubscribeView = {
  SubscribePage: subscribePage,
  SubscribePageInit: subscribePageInit,
};
