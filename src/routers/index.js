const router = require("express").Router();
const recognize = require("./recognize");
const detect = require("./detect");
const downloadPdf = require("./downloadPdf");
const imageProcessing = require("./imageProcessing")
const home = require("./home");

router.use("/", home); // home route
router.use("/process",imageProcessing)
router.use("/download", downloadPdf);
router.use("/recognize", recognize);
router.use("/detect", detect);

module.exports = router;
