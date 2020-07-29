module.exports.DOCUMENT_MANAGEMENT = "/";
module.exports.DOCUMENT_TRANSLATION = "/document_translation/:documentId";
module.exports.LOGIN = "/login";

module.exports.documentTranslation = (documentId) =>
  this.DOCUMENT_TRANSLATION.replace(":documentId", documentId);
