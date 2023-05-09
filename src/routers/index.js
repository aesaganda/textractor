const router = require("express").Router();
const recognize = require("./recognize");
const detect = require("./detect");
const home = require("./home");

router.use("/recognize", recognize);
router.use("/detect", detect);
router.use("/", home); // home route

module.exports = router;
