const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/views/login.html");
});

module.exports = router;
