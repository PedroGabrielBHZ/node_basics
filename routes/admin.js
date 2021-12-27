const path = require("path");
const e = require("express");
const rootDir = require("../util/path")

const router = e.Router();

router.get("/add-product", (req, res, next) => {
  console.log("I am adding a nice, really nice product!");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
