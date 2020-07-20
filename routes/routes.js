const jwtVerify = require("../middlewares/jwtVerify");
const express = require("express")
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { User } = require("../data/models");


console.log("rutas")
  //////////////////////
  // User Controller  //
  //////////////////////

  // Registro
  router.post("/api/register", userController.register);

  //////////////////////
  //  Auth Controller //
  //////////////////////

  // Login
  router.post("/api/login", authController.login);

module.exports = router;