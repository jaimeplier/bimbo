export default function errorHandler(err, callback, res) {
  if (callback) callback('Unexpected error. Please try again');
  // eslint-disable-next-line
  else { alert('Unexpected error. Please try again'); }
  console.log('The error ', err);
  console.log('The response ', res);
}
