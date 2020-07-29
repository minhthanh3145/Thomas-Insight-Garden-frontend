let protocol = "http";
let host = "localhost:3000";
let endpoint = `${protocol}://${host}`;

const uploadDocumentHttpEffectConfigs = (userId, token, formData, docName) => ({
  url: `${endpoint}/translation/create_translation_document?user_id=${userId}&name=${docName}`,
  options: {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
    method: "POST",
    body: formData,
  },
});

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

module.exports.ApiProvider = {
  GetNote: getNote,
  SearchForNote: searchForNote,
};
