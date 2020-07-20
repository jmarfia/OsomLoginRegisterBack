require("dotenv").config();

const { User, Product } = require("../data/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const { json } = require("express");

let transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: "welcometoosomness@hotmail.com",
    pass: "osomness123",
  },
});

module.exports = {
  register(req, res) {
    console.log(req.body);
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 10),
      sexo: req.body.sexo,
      mutualista: req.body.mutualista,
    });

    let mailOptions = {
      from: "welcometoosomness@hotmail.com",
      to: user.email,
      subject: "Gracias por registrarte en Osom!",
      text: `Bienvenido ${user.firstName}!
      
      Tu registro fue creado satisfactoriamente.


      Saludos,

      Equipo de Osom.
      `,
    };

    let email = req.body.email;
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    User.findOne({ email: email }).then((result) => {
      if (result !== null) {
        return res.status(500).send("Error");
      }
      user.save();

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.status(201).json({ token: token });
    });
  },

};
