export default function errorHandler(err, callback) {
  if(callback) callback('Unexpected error. Please try again');
  console.log("The error");
}
