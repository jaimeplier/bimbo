module.exports = {
  type: String,
  trim: true,
  lowercase: true,
  unique: true,
  required: "Email address is required",
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
}
