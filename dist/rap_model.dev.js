"use strict";

var mongoose = require("mongoose");

var rapSchema = new mongoose.Schema({
  id: String,
  name: String,
  lastname: String,
  email: String,
  password: String
});
module.exports = mongoose.model("rap_phim", rapSchema);