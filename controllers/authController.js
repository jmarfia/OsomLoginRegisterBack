const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../data/models");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const hasValidPassword =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && hasValidPassword)) {
      return res
        .status(401)
        .json({ error: "correo electrónico o contraseña incorrectos" });
    }

    const userForToken = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    res.status(201).json({ token, email: user.email, firstName: user.firstName });
  },



};
