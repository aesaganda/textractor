const router = require("express").Router();
const recognize = require("./recognize");
const detect = require("./detect");
const downloadPdf = require("./downloadPdf");
const imageProcessing = require("./imageProcessing");
const schedule = require("./schedule");
const home = require("./home");
const fontFinder = require("./font-finder");

router.use("/", home); // home route
router.use("/schedule", schedule);
router.use("/process", imageProcessing);
router.use("/download", downloadPdf);
router.use("/recognize", recognize);
router.use("/detect", detect);
router.use("/fontFinder", fontFinder);

module.exports = router;
