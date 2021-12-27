const e = require("express");
const rootDir = require("../util/path")
const path = require("path");

const router = e.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
