export default function errorHandler(err, callback) {
  callback ? callback("Unexpected error. Please try again") : null;
  console.log("The error");
}
