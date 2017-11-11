module.exports = function downloadAttachmentHeaders(name) {
  return {
    'Content-disposition':'attachment; filename='+ name
  }
}
