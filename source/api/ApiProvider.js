let protocol = "http";
let host = "localhost:3000";
let endpoint = `${protocol}://${host}`;

const searchForNote = (titleTerm) =>
  $.ajax({
    url: `${endpoint}/search_note?note_title=${titleTerm}`,
    headers: {
      Accept: "application/json",
    },
    options: {
      method: "GET",
    },
  });

const getNote = (title) =>
  $.ajax({
    url: `${endpoint}/get_note?note_title=${title}`,
    headers: {
      Accept: "application/json",
    },
    options: {
      method: "GET",
    },
  });

const addContactToEmailList = (email, name) =>
  $.ajax({
    url: `${endpoint}/add_to_mail_list?email=${email}&name=${name}`,
    type: "POST",
    contentType: "application/json; charset=utf-8",
  });



module.exports.ApiProvider = {
  GetNote: getNote,
  SearchForNote: searchForNote,
  AddContactToEmailList: addContactToEmailList
};
