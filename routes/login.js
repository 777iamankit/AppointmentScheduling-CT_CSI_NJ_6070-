const express = require("express");
const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { number: identifier }],
    });

    if (!existingUser) {
      return res.status(400).send("User does not exist");
    }
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(401).send("Incorrect password");
    }
    // res.send('Login successfull');
    res.redirect("../views/dashboard.html");
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
