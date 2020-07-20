"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: String,
  phone: String,
  sexo: String,
  mutualista: String,
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
