const router = require("express").Router();
const recognize = require("./recognize");
const detect = require("./detect");
const imageToPdf = require("./imageTopdf");
const home = require("./home");

router.use("/imageToPdf", imageToPdf);
router.use("/recognize", recognize);
router.use("/detect", detect);
router.use("/", home); // home route

module.exports = router;
